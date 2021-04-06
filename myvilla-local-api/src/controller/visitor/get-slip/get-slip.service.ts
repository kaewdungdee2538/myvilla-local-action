import { Body, Injectable } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class GetSlipService {
    constructor(
        private readonly dbconnecttion: dbConnection
        , private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }

    async getSlipInInfo(@Body() body) {
        return await this.getSlipInInfoFormBase(body);
    }

    async getSlipInInfoFormBase(@Body() body) {
        const visitor_record_code = body.visitor_record_code;
        const company_id = body.company_id;
        let sql = `select 
        visitor_record_id,visitor_record_code,ref_visitor_record_id,tbv_code
        ,visitor_slot_number,card_code,card_name
        ,cartype_name_th,cartype_name_en,cartype_category_info
        ,visitor_info,action_info
        ,home_info,guardhouse_in_code
        ,license_plate
        ,parking_in_datetime
        ,datetime_action
        from t_visitor_record
        where visitor_record_code = $1
        and company_id = $2
        and action_type ='IN'
        order by 1
        limit 1;
        `
        const query = {
            text: sql
            , values: [visitor_record_code, company_id]
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
