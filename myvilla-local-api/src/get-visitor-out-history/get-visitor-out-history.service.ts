import { Body, Injectable } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class GetVisitorOutHistoryService {
    constructor(
        private readonly dbconnecttion: dbConnection
        , private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }


    async getVisitorOutHistory(@Body() body) {
        return await this.getVisitorOutHistoryFormBase(body);
    }

    async getVisitorOutHistoryFormBase(@Body() body) {
        const datetime_start = body.datetime_start;
        const datetime_end = body.datetime_end;
        const company_id = body.company_id;
        let sql = `select 
        visitor_record_id,visitor_record_code,ref_visitor_record_id,tbv_code
        ,visitor_slot_number,card_code,card_name
        ,cartype_name_th,cartype_name_en,cartype_category_info
        ,visitor_info,action_info
        ,home_info,guardhouse_in_code
        ,license_plate
        ,parking_in_datetime
        ,parking_out_datetime
        from t_visitor_record
        where parking_in_datetime between $1 and $2
        and company_id = $3
        and action_type ='OUT'
        order by parking_in_datetime;
        `
        const query = {
            text: sql
            , values: [datetime_start,datetime_end, company_id]
        }
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error)
            throw new StatusException(
                {
                    error: res.error
                    , result: null
                    , message: this.errMessageUtilsTh.messageProcessFail
                    , statusCode: 200
                }, 200)
        else if (res.result.length === 0) throw new StatusException(
            {
                error: this.errMessageUtilsTh.errSlipInGetNotRow
                , result: null
                , message: this.errMessageUtilsTh.errSlipInGetNotRow
                , statusCode: 200
            }, 200)
        throw new StatusException(
            {
                error: null
                , result: res.result
                , message: this.errMessageUtilsTh.messageSuccess
                , statusCode: 200
            }, 200)
    }

}
