import { Body, Injectable } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class BActionOutService {
    constructor(
        private readonly dbconnecttion: dbConnection
        , private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }

    async saveBActionOut(@Body() body, files: any, employeeObj: any) {
        return this.saveOut(body, files, employeeObj);
    }

    async saveOut(@Body() body, files: any, employeeObj: any) {
        const images = files;
        const img_visitor_out = { images }
        const guardhouse_out_id = body.guardhouse_out_id
        const guardhouse_out_code = body.guardhouse_out_code
        const pos_id = body.pos_id ? body.pos_id.toString() : '';
        const company_id = body.company_id
        const tbv_code = body.tbv_code
        const employee_out_id = body.employee_out_id
        const employee_out_info = JSON.stringify(employeeObj)
        // const visitor_record_id = body.visitor_record_id
        const tcpl_id = body.tcpl_id ? body.tcpl_id : null;
        const parking_payment = body.sum_parking_total_after_discount ? parseInt(body.sum_parking_total_after_discount) : 0;
        const overnight_fines = body.sum_overnight_fine_amount ? parseInt(body.sum_overnight_fine_amount) : 0;
        const total_price = parking_payment + overnight_fines;
        const customer_payment = body.customer_payment ? parseInt(body.customer_payment) : 0;
        const payment_type_id = body.payment_type_id ? body.payment_type_id : 0;
        const payment_flag = total_price > 0 ? 'Y' : 'N';
        const discount_info = body.promotion_object && body.promotion_object != 'null' ? body.promotion_object : null;
        const payment_info = body.payment_info && body.payment_info != 'null' ? body.payment_info : null;
        let sql1 = `update t_visitor_record set 
        img_visitor_out = $1
        ,action_out_flag = 'Y'
        ,action_type = 'OUT'
        ,guardhouse_out_id = $2
        ,guardhouse_out_code = $3
        ,parking_out_datetime = now()
        ,datetime_action = now()
        ,pos_id = $4::varchar
        ,employee_out_id = $5,employee_out_info = $6
        ,tcpl_id = $7
        ,payment_status_flag = $8
        ,parking_payment_datetime = 
        (select case when $12 > 0 then current_timestamp else null end)
        ,payment_type_id = $9
        ,parking_payment = $10
        ,overnight_fines = $11
        ,total_price = $12
        ,discount_info = $13
        ,receipt_running = (select case when $10 > 0 then 
            (select coalesce(max(receipt_running)+1,1) from t_visitor_record
            where company_id = $15
            and pos_id = $4::varchar)
            else 0 end
            from t_visitor_record
            limit 1 )
        ,payment_info = $14
        ,customer_payment = $15
        where company_id = $16 and tbv_code = $17 ;`

        const query1 = {
            text: sql1
            , values: [
                img_visitor_out, guardhouse_out_id, guardhouse_out_code
                ,pos_id, employee_out_id, employee_out_info
                , tcpl_id, payment_flag, payment_type_id
                , parking_payment, overnight_fines, total_price
                , discount_info
                , payment_info
                , customer_payment
                , company_id, tbv_code
            ]
        }
        const querys = [query1]
        const res = await this.dbconnecttion.savePgData(querys)
        console.log(querys);
        if (res.error) throw new StatusException(
            {
                error: res.error
                , result: null
                , message: this.errMessageUtilsTh.messageProcessFail
                , statusCode: 200
            }, 200)
        else throw new StatusException(
            {
                error: null
                , result: this.errMessageUtilsTh.messageSuccess
                , message: this.errMessageUtilsTh.messageSuccess
                , statusCode: 200
            }, 200)

    }
}
