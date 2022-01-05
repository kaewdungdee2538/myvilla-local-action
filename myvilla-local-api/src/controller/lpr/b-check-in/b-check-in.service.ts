import { Body, Injectable } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class LPRBCheckInService {
    constructor(
        private readonly dbconnecttion: dbConnection
        , private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }

    async getBookingWithLPR(@Body() body) {
        return this.getBookingInfoWithLPR(body);
    }

    async getBookingInfoWithLPR(@Body() body) {
        const company_id = body.company_id;
        const license_plate = body.license_plate;
        let sql = `select 
        tbv.tbv_id,tbv.tbv_code
        ,tbv.home_line_id
        ,mhl.home_id,mh.home_code,mh.home_name,mh.home_address,mh.home_type
        ,mh.home_data,mh.home_remark
        ,mh.home_privilege_line_amount,mh.home_privilege_card_amount
        ,tbv.tbv_start_datetime as booking_start_datetime
        ,tbv.tbv_end_datetime as booking_end_datetime
        ,tbv.tbv_license_plate as license_plate
        ,tbv.tbv_contact_person as person_name
        ,tbv.tbv_mobile_contact_person as person_mobile
        ,tbv.tbv_detail,tbv.tbv_data 
        ,case when tbv.tbv_status = 'Y' then true else false end as action_out_status
        ,mhl.home_line_first_name as host_first_name
        ,mhl.home_line_last_name as host_last_name
        ,mhl.home_line_mobile_phone as host_mobile
        ,tbv.create_by,tbv.create_date
        from t_booking_visitor tbv
        inner join m_home_line mhl on tbv.home_line_id = mhl.home_line_id
        left join m_home mh on mhl.home_id = mh.home_id
        where tbv.delete_flag = 'N'
        and current_timestamp < tbv_end_datetime
        and tbv.company_id = $1
        and tbv_license_plate = $2
        order by tbv_end_datetime desc 
        limit 1
        ;`
        const query = {
            text: sql
            , values: [company_id, license_plate]
        }
        const res = await this.dbconnecttion.getPgData(query);
        console.log(res.result[0])
        if (await res.error) throw new StatusException(
            {
                error: res.error
                , result: null
                , message: this.errMessageUtilsTh.messageProcessFail
                , statusCode: 200
            }, 200)
        else if (res.result.length === 0) throw new StatusException(
            {
                error: this.errMessageUtilsTh.errBookingNotFound
                , result: null
                , message: this.errMessageUtilsTh.errBookingNotFound
                , statusCode: 200
            }, 200)
        else if (res.result[0].action_out_status) throw new StatusException(
            {
                error: this.errMessageUtilsTh.errBookingIsUse
                , result: null
                , message: this.errMessageUtilsTh.errBookingIsUse
                , statusCode: 200
            }, 200)
        else throw new StatusException(
            {
                error: null
                , result: res.result[0]
                , message: this.errMessageUtilsTh.messageSuccess
                , statusCode: 200
            }, 200)
    }
}
