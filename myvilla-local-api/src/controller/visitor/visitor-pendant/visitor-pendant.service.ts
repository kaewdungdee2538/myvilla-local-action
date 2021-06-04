import { Body, Injectable } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class VisitorPendantService {
    constructor(
        private readonly dbconnecttion: dbConnection
        , private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }

    async getVisitorPendantAll(@Body() body) {
        return this.getVisitorPendantAllFromDatabase(body);
    }

    async getVisitorPendantAllFromDatabase(@Body() body) {
        const company_id = body.company_id;
        const identity_card = body.identity_card ? body.identity_card : '';
        const license_plate = body.license_plate ? body.license_plate : '';
        let sql = `select 
        visitor_record_id,visitor_record_code
        ,visitor_slot_id,visitor_slot_number
        ,card_id,card_code,card_name
         ,cartype_id,cartype_name_th,cartype_name_en
         ,cartype_category_id,cartype_category_info
         ,visitor_info,action_info
         ,home_id,home_info
         ,license_plate
         ,img_visitor_in
         ,parking_in_datetime
         ,datetime_action
         ,guardhouse_in_id,guardhouse_in_code
         ,estamp_flag,estamp_datetime
         ,employee_in_id,employee_in_info
         from t_visitor_record
         where action_out_flag = 'N'
         and tbv_code is null
         and company_id = $1`
        if (identity_card)
            sql += ` and visitor_info->>'identity_card' = '${identity_card}'`
        if (license_plate)
            sql += ` and license_plate LIKE '%${license_plate}%'`
        sql += ` order by parking_in_datetime;`
        const query = {
            text: sql
            , values: [company_id]
        }
        const res = await this.dbconnecttion.getPgData(query);
        console.log(res.result);
        if (res.error)
            throw new StatusException(
                {
                    error: res.error
                    , result: null
                    , message: this.errMessageUtilsTh.messageProcessFail
                    , statusCode: 200
                }
                , 200)
        else if (res.result.length === 0) throw new StatusException(
            {
                error: this.errMessageUtilsTh.errVisitorPendantNotInBase
                , result: null
                , message: this.errMessageUtilsTh.errVisitorPendantNotInBase
                , statusCode: 200
            }
            , 200)
        else throw new StatusException(
            {
                error: null
                , result: { data: res.result, value_count: res.result.length }
                , message: this.errMessageUtilsTh.messageSuccess
                , statusCode: 200
            }
            , 200)
    }
}
