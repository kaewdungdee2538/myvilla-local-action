import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { LoadSettingLocalUtils } from 'src/utils/load_setting_local.utils';
@Injectable()
export class bGetBookingOutInfoMiddleware implements NestMiddleware {
  constructor(
    private readonly errMessageUrilTh: ErrMessageUtilsTH,
    private readonly loadSettingLocalUtils: LoadSettingLocalUtils,
    private readonly dbconnecttion: dbConnection,
  ) {}
  async use(req: Request, res: Response, next: () => void) {
    const messageBookingInfo = await this.checkBookingOutEstamp(req.body);
    console.log(JSON.stringify(messageBookingInfo));
    if (messageBookingInfo) {
      console.log(
        'Middleware booking out : ' + JSON.stringify(messageBookingInfo),
      );
      res.send({
        response: {
          error: messageBookingInfo,
          result: null,
          message: messageBookingInfo,
          statusCode: 200,
        },
      });
    } else next();
  }

  async checkBookingOutEstamp(body: any) {
    const company_id = body.company_id;
    const tbv_code = body.tbv_code;
    //-----------เช็ค setting ว่าเปิดระบบให้เป็นแบบตรวจสอบ Estamp ก่อนถึงจะออกได้หรือไม่
    const checkEstamp = await this.loadSettingLocalUtils.getBookingOutEstampMode(
      company_id,
    );
    if (checkEstamp) {
      let sql = `
            SELECT
                tvr.visitor_record_id
                ,CASE WHEN estamp_flag = 'Y' THEN true ELSE false END AS estamp_flag
                ,mcc.cartype_category_id
                ,COALESCE(CAST(mcc.cartype_category_info->>'ignore_estamp' AS BOOLEAN),false) AS ignore_estamp
            FROM t_visitor_record tvr
            LEFT JOIN m_cartype_category mcc ON tvr.cartype_category_id = mcc.cartype_category_id
            where tvr.action_out_flag = 'N'
            and tvr.company_id = $1
            and tvr.tbv_code = $2
            ;`;
      const query = {
        text: sql,
        values: [company_id, tbv_code],
      };
      const res = await this.dbconnecttion.getPgData(query);
      if (await res.error) {
        console.log(res.error);
        return this.errMessageUrilTh.errBookingGetError;
      } else if (res.result.length === 0) {
        console.log('Middle ware Booking No record in');
        return this.errMessageUrilTh.errVisitorNotIn;
      } else if (!res.result[0].ignore_estamp && !res.result[0].estamp_flag) {
        console.log('Middle ware Booking Not Estamp');
        return this.errMessageUrilTh.errVisitorNotVerifyEstamp;
      } else return null;
    } else {
      let sql = `
            select visitor_record_id
            from t_visitor_record
            where action_out_flag = 'N'
            and company_id = $1
            and tbv_code = $2
            ;`;
      const query = {
        text: sql,
        values: [company_id, tbv_code],
      };
      const res = await this.dbconnecttion.getPgData(query);
      if (await res.error) {
        console.log(res.error);
        return this.errMessageUrilTh.errBookingGetError;
      } else if (res.result.length === 0) {
        console.log('Middle ware Booking Not In');
        return this.errMessageUrilTh.errBookingQRCodeNotIn;
      } else return null;
    }
  }
}
