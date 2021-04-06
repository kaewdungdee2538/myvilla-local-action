import { Body, Injectable } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class GetBookingInfoService {
    constructor(
        private readonly dbconnecttion: dbConnection
        , private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }

    async getBookingInfo(@Body() body) {
        return this.getBooking(body);
    }

    async getBooking(@Body() body) {
        const company_id = body.company_id;
        const tbv_code = body.tbv_code;
        let sql = `select 
        tb.tbv_code
        ,tb.home_line_id
        ,mhl.home_id,mh.home_code,mh.home_name,mh.home_address,mh.home_type
        ,mh.home_data,mh.home_remark
        ,mh.home_privilege_line_amount,mh.home_privilege_card_amount
        ,tb.tbv_start_datetime
        ,tb.tbv_end_datetime
        ,tb.tbv_license_plate
        ,tb.tbv_contact_person
        ,tb.tbv_mobile_contact_person
        ,tb.tbv_detail,tb.tbv_data
        ,tb.create_by,tb.create_date
        from t_booking_visitor tb
        inner join m_home_line mhl on tb.home_line_id = mhl.home_line_id
        left join m_home mh on mhl.home_id = mh.home_id
        where tb.delete_flag = 'N'
        and tb.tbv_status = 'N'
        and current_timestamp <= tb.tbv_end_datetime
        and tb.company_id = $1
        and tb.tbv_code = $2
        limit 1
        ;`
        const query = {
            text: sql
            , values: [company_id, tbv_code]
        }
        const res = await this.dbconnecttion.getPgData(query);
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
        else throw new StatusException(
            {
                error: null
                , result: res.result[0]
                , message: this.errMessageUtilsTh.messageSuccess
                , statusCode: 200
            }, 200)
    }
}
