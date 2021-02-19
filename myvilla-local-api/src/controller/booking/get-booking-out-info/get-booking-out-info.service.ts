import { Body, Injectable } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class GetBookingOutInfoService {
    constructor(
        private readonly dbconnecttion: dbConnection
        , private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }

    async getBookingOutInfo(@Body() body) {
        return this.getBookingInInfo(body);
    }

    async getBookingInInfo(@Body() body) {
        const company_id = body.company_id
        const tbv_code = body.tbv_code
        let sql1 = `select  
        visitor_record_id,visitor_record_code,ref_visitor_record_id
        ,tbv_code
        ,cartype_id,cartype_name_th,cartype_name_en
        ,cartype_category_id,cartype_category_info
        ,visitor_info,action_info
        ,home_id,home_info
        ,guardhouse_in_id,guardhouse_in_code
        ,employee_in_id,employee_in_info
        ,license_plate
        ,img_visitor_in
        ,estamp_id,estamp_info,estamp_datetime,estamp_image
        ,estamp_flag
        ,datetime_action
        from t_visitor_record
        where action_out_flag = 'N'
        and company_id = $1
        and tbv_code = $2
        limit 1;`
        const query1 = {
            text: sql1
            , values: [
                company_id
                , tbv_code
            ]
        }
        const res = await this.dbconnecttion.getPgData(query1);
        if (res.error) throw new StatusException(
            {
                error: res.error
                , result: null
                , message: this.errMessageUtilsTh.messageProcessFail
                , statusCode: 400
            }, 400)
        else if (res.result.length === 0) throw new StatusException(
            {
                error: this.errMessageUtilsTh.errBookingNotFound
                , result: null
                , message: this.errMessageUtilsTh.errBookingNotFound
                , statusCode: 400
            }, 400)
        else throw new StatusException(
            {
                error: null
                , result: res.result[0]
                , message: this.errMessageUtilsTh.messageSuccess
                , statusCode: 200
            }, 200)
    }
}
