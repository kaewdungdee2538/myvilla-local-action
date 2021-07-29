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

    async getBookingInfoWithLPR(@Body() body){
        const company_id = body.company_id;
        const license_plate = body.license_plate;
        let sql = `select tbv_id,tbv_code
        ,to_char(tbv_start_datetime,'YYYY-MM-DD HH24:MI:SS') as  booking_start_datetime
        ,to_char(tbv_end_datetime,'YYYY-MM-DD HH24:MI:SS') as  booking_end_datetime
        ,tbv_license_plate as license_plate,tbv_contact_person as person_name,tbv_mobile_contact_person as person_mobile
        ,case when tbv_status = 'Y' then true else false end as action_out_status
        ,tbv.home_line_id
        ,mhl.home_line_first_name as host_first_name
        ,mhl.home_line_last_name as host_last_name
        ,mhl.home_line_mobile_phone as host_mobile
        ,tbv.company_id
        
        from t_booking_visitor tbv
        left join m_home_line mhl
        on tbv.home_line_id = mhl.home_line_id
        
        where current_timestamp < tbv_end_datetime
        and tbv.company_id = $1
        and tbv_license_plate = $2
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
        else if (res.result[0].action_out_status)throw new StatusException(
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
