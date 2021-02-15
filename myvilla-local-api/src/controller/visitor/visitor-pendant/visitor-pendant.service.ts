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
        const site_id = body.site_id;
        let sql = `select `
        sql += `visitor_record_id,visitor_record_uuid`
        sql += `,visitor_slot_id,visitor_slot_number`
        sql += `,card_id,card_code,card_name`
        sql += ` ,cartype_id,cartype_name_th,cartype_name_en`
        sql += ` ,cartype_category_id,cartype_category_info`
        sql += ` ,visitor_info,action_info`
        sql += ` ,home_id,home_info`
        sql += ` ,license_plate`
        sql += ` ,img_visitor_in`
        sql += ` ,parking_in_datetime`
        sql += ` ,datetime_action`
        sql += ` ,guardhouse_in_id,guardhouse_in_code`
        sql += ` ,employee_in_id,employee_in_info`
        sql += ` from t_visitor_record`
        sql += ` where action_out_flag = 'N'`
        sql += ` and action_type = 'IN'`
        sql += ` and site_id = $1`
        sql += ` order by parking_in_datetime;`
        const query = {
            text: sql
            , values: [site_id]
        }
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error)
            throw new StatusException(
                {
                    error: res.error
                    , result: null
                    , message: this.errMessageUtilsTh.errHomeGetFail
                    , statusCode: 400
                }
                , 400)
        throw new StatusException(
            {
                error: null
                , result: res.result
                , message: this.errMessageUtilsTh.messageSuccess
                , statusCode: 400
            }
            , 200)
    }
}
