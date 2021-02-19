import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { dbConnection } from "src/pg_database/pg.database";
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
import { LoadSettingLocalUtils } from "src/utils/load_setting_local.utils";
@Injectable()
export class bGetBookingOutInfoMiddleware implements NestMiddleware {
    constructor(
        private readonly errMessageUrilTh: ErrMessageUtilsTH,
        private readonly loadSettingLocalUtils: LoadSettingLocalUtils,
        private readonly dbconnecttion: dbConnection
    ) { }
    async use(req: Request, res: Response, next: () => void) {
        const messageBookingInfo = await this.checkBookingOutEstamp(req.body);
        console.log(JSON.stringify(messageBookingInfo));
        if (messageBookingInfo) {
            console.log('Middleware booking out : ' + JSON.stringify(messageBookingInfo))
            res.send({
                response: {
                    error: messageBookingInfo
                    , result: null
                    , message: messageBookingInfo
                    , statusCode: 400
                }
            });
        } else
            next();
    }

    async checkBookingOutEstamp(body: any) {
        const company_id = body.company_id;
        const tbv_code = body.tbv_code;
        //-----------เช็ค setting ว่าเปิดระบบให้เป็นแบบตรวจสอบ Estamp ก่อนถึงออกจากระบบได้หรือไม่
        const checkEstamp = await this.loadSettingLocalUtils.getBookingOutEstampMode(company_id);
        if (checkEstamp) {
            let sql = `
            select visitor_record_id
            from t_visitor_record
            where action_out_flag = 'N'
            and estamp_flag = 'Y'
            and company_id = $1
            and tbv_code = $2
            ;`
            const query = {
                text: sql
                , values: [company_id, tbv_code]
            }
            const res = await this.dbconnecttion.getPgData(query);
            if (await res.error) {
                console.log(res.error)
                return this.errMessageUrilTh.errBookingGetError
            } else if (res.result.length === 0) {
                console.log('Middle ware Booking Not Estamp')
                return this.errMessageUrilTh.errBookingNotVerifyEstamp
            } else return null
        } else {
            let sql = `
            select visitor_record_id
            from t_visitor_record
            where action_out_flag = 'N'
            and company_id = $1
            and tbv_code = $2
            ;`
            const query = {
                text: sql
                , values: [company_id, tbv_code]
            }
            const res = await this.dbconnecttion.getPgData(query);
            if (await res.error) {
                console.log(res.error)
                return this.errMessageUrilTh.errBookingGetError
            } else if (res.result.length === 0) {
                console.log('Middle ware Booking Not In')
                return this.errMessageUrilTh.errBookingQRCodeNotIn
            } else return null
        }

    }

}