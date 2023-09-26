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
                , result: res.result[0]
                , message: this.errMessageUtilsTh.messageSuccess
                , statusCode: 200
            }, 200)
    }

    async getSlipOutInfo(@Body() body) {
        return await this.getSlipOutInfoFormBase(body);
    }

    async getSlipOutInfoFormBase(@Body() body) {
        const visitor_record_id = body.visitor_record_id;
        const company_id = body.company_id;
        let sql = `select 
        CONCAT(tvr.company_id,cartype_name_contraction,mpt.payment_type_code,guardhouse_out_id,TO_CHAR(current_timestamp,'YY'),TO_CHAR(current_timestamp,'MM'),TO_CHAR(current_timestamp,'DD'),to_char(tvr.receipt_running, 'FM9990999999')) AS receipt_no
        ,company_name
        ,pos_id
        ,guardhouse_in_code
        ,guardhouse_out_code
        ,visitor_record_id,visitor_record_code,ref_visitor_record_id,tbv_code
        ,CASE WHEN visitor_slot_id IS NOT NULL THEN 'SLOT' 
        WHEN card_id IS NOT NULL THEN 'CARD'
        ELSE 'BOOKING' END AS record_in_use_type
        ,visitor_slot_number,card_code,card_name
        ,cartype_name_th,cartype_name_en,cartype_category_info
        ,visitor_info,action_info
        ,home_info
        ,license_plate
        ,tvr.payment_type_id
        ,mpt.payment_type_name
        ,parking_payment
        ,overnight_fines
        ,losscard_fines
        ,total_price
        ,payment_info
        ,customer_payment
        ,discount_info AS promotion_info
        ,to_char(parking_in_datetime,'YYYY-MM-DD HH24:MI:SS') AS parking_in_datetime
        ,to_char(parking_payment_datetime,'YYYY-MM-DD HH24:MI:SS') AS parking_payment_datetime
        ,to_char(parking_out_datetime,'YYYY-MM-DD HH24:MI:SS') AS parking_out_datetime
        ,cardproblem_info
        ,case when cardproblem_flag = 'Y' then true else false end as cardproblem_status
        ,to_char(cardproblem_datetime,'YYYY-MM-DD HH24:MI:SS') AS cardproblem_datetime
        from t_visitor_record tvr
        left join m_payment_type mpt
        on tvr.payment_type_id = mpt.payment_type_id
        left join m_company mc
        on tvr.company_id = mc.company_id
        where visitor_record_id = $1
        and tvr.company_id = $2
        and action_type ='OUT'
        order by 1
        limit 1;
        `
        const query = {
            text: sql
            , values: [visitor_record_id, company_id]
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
                error: this.errMessageUtilsTh.errSlipOutGetNotRow
                , result: null
                , message: this.errMessageUtilsTh.errSlipOutGetNotRow
                , statusCode: 200
            }, 200)
        throw new StatusException(
            {
                error: null
                , result: res.result[0]
                , message: this.errMessageUtilsTh.messageSuccess
                , statusCode: 200
            }, 200)
    }
}
