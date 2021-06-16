import { Body, Injectable } from '@nestjs/common';
import { VsActionInCheckEmployeeMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_check_employee.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class ActionOutSaveService {
    constructor(
        private readonly dbconnecttion: dbConnection
        , private readonly errMessageUtilsTh: ErrMessageUtilsTH
        , private readonly vsActionInCheckEmployeeMiddleware: VsActionInCheckEmployeeMiddleWare
    ) { }

    async saveActionOut(files: any, @Body() body) {
        return await this.saveOut(files, body);
    }

    async saveOut(files: any, @Body() body) {
        console.log(files);
        console.log(body);
        const getRecordIn = await this.getVisitorRecordId(body);
        if (getRecordIn) {
            const getVisitorInInfo = await this.getVisitorRecordIn(getRecordIn);
            if (getVisitorInInfo) {
                const employeeObj = await this.vsActionInCheckEmployeeMiddleware.CheckOutEmployee(body)
                if (employeeObj)
                    return await this.Save(body, files, getVisitorInInfo, employeeObj);
                else throw new StatusException(
                    {
                        error: this.errMessageUtilsTh.errEmployeeInfoNotFound
                        , result: null
                        , message: this.errMessageUtilsTh.errEmployeeInfoNotFound
                        , statusCode: 200
                    }, 200)
            }

        }
        return getRecordIn;
    }

    async getVisitorRecordId(@Body() body) {
        const company_id = !body.company_id ? 0 : body.company_id;
        const card_code = !body.card_code ? '' : body.card_code;
        const card_name = !body.card_name ? '' : body.card_name;
        const visitor_slot_number = !body.visitor_slot_number ? 0 : body.visitor_slot_number;

        let sql = `select func_getvs_uuid_card_or_slot($1,$2,$3,$4) as visitor_record_code;`
        const query = {
            text: sql
            , values: [company_id, card_code, card_name, visitor_slot_number]
        }
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error)
            throw new StatusException(
                {
                    error: res.error
                    , result: null
                    , message: this.errMessageUtilsTh.messageProcessFail
                    , statusCode: 200
                }, 200
            )
        else if (res.result.length === 0)
            throw new StatusException(
                {
                    error: this.errMessageUtilsTh.errVisitorRecordIDNotFound
                    , result: null
                    , message: this.errMessageUtilsTh.errVisitorRecordIDNotFound
                    , statusCode: 200
                }, 200
            )
        return res.result[0].visitor_record_code
    }

    async getVisitorRecordIn(recordin_uuid: any) {
        const record_uuid = recordin_uuid;
        console.log(record_uuid);
        let sql = `(select
            visitor_record_id
            ,visitor_slot_id,visitor_slot_number
            ,card_id,card_code,card_name
            ,cartype_id,cartype_name_contraction,cartype_name_th,cartype_name_en
            ,cartype_category_id,cartype_category_info
            ,visitor_info,action_info
            ,home_id,home_info
            ,license_plate
            ,img_visitor_in
            ,parking_in_datetime
            ,company_id
            ,guardhouse_in_id,guardhouse_in_code
            ,employee_in_id,employee_in_info
            ,visitor_record_code
            from t_visitor_record
            where visitor_record_code = $1)`
        const query = {
            text: sql
            , values: [record_uuid]
        }
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error)
            throw new StatusException(
                {
                    error: res.error
                    , result: null
                    , message: this.errMessageUtilsTh.messageProcessFail
                    , statusCode: 200
                }, 200
            )
        else if (res.result.length === 0)
            throw new StatusException(
                {
                    error: this.errMessageUtilsTh.errVisitorRecordInNotFound
                    , result: null
                    , message: this.errMessageUtilsTh.errVisitorRecordInNotFound
                    , statusCode: 200
                }, 200
            )
        return res.result[0]
    }

    async Save(@Body() body, files: any, recordInObj: any, employeeObj: any) {
        const images = files;
        const company_id = recordInObj.company_id

        const visitor_record_code = recordInObj.visitor_record_code;
        const visitor_slot_id = recordInObj.visitor_slot_id;
        const card_id = recordInObj.card_id
        const employee_out_id = body.employee_out_id
        const employee_out_info = JSON.stringify(employeeObj)
        const img_visitor_out = { images }
        const guardhouse_out_id = body.guardhouse_out_id
        const guardhouse_out_code = body.guardhouse_out_code;
        const pos_id = body.pos_id ? body.pos_id.toString() : '';
        const tcpl_id = body.tcpl_id ? body.tcpl_id : null;
        const parking_payment = body.sum_parking_total_after_discount ? parseInt(body.sum_parking_total_after_discount) : 0;
        const overnight_fines = body.sum_overnight_fine_amount ? parseInt(body.sum_overnight_fine_amount) : 0;
        const total_price = parking_payment + overnight_fines;
        const customer_payment = body.customer_payment ? parseInt(body.customer_payment) : 0;
        const payment_type_id = body.payment_type_id ? body.payment_type_id : 0;
        const payment_flag = total_price > 0 ? 'Y' : 'N';
        const discount_info = body.promotion_object && body.promotion_object != 'null' ? body.promotion_object : null;
        const payment_info = body.payment_info && body.payment_info != 'null' ? body.payment_info : null;
        console.log(JSON.stringify(recordInObj));
        let sql1 = `update t_visitor_record set 
        img_visitor_out = $1
        ,action_out_flag = 'Y'
        ,action_type = 'OUT'
        ,guardhouse_out_id = $2
        ,guardhouse_out_code = $3
        ,parking_out_datetime = current_timestamp
        ,datetime_action = current_timestamp
        ,employee_out_id = $4
        ,employee_out_info = $5
        ,pos_id = $6::varchar
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
            and pos_id = $6::varchar)
            else 0 end
            from t_visitor_record
            limit 1 )
        ,payment_info = $14
        ,customer_payment = $15
        where company_id = $16 and visitor_record_code = $17;`
        const query = {
            text: sql1
            , values: [
                img_visitor_out, guardhouse_out_id, guardhouse_out_code
                , employee_out_id, employee_out_info, pos_id
                , tcpl_id, payment_flag, payment_type_id
                , parking_payment, overnight_fines, total_price
                , discount_info
                , payment_info
                , customer_payment
                , company_id, visitor_record_code
            ]
        }
        let query2;
        if (visitor_slot_id) {
            let sql2 = `update m_visitor_slot set status_flag = 'N',visitor_record_code = null,update_by =$1,update_date = now() where visitor_slot_id = $2 and company_id = $3`;
            query2 = {
                text: sql2
                , values: [employee_out_id, visitor_slot_id, company_id]
            }
        } else {
            let sql2 = `update m_card set status_flag = 'N',visitor_record_code = null,update_by =$1,update_date = now() where card_id = $2 and company_id = $3`;
            query2 = {
                text: sql2
                , values: [employee_out_id, card_id, company_id]
            }
        }

        const allQuerys = [query, query2]

        const res = await this.dbconnecttion.savePgData(allQuerys);
        if (res.error)
            throw new StatusException(
                {
                    error: res.error
                    , result: null
                    , message: this.errMessageUtilsTh.messageProcessFail
                    , statusCode: 200
                }, 200)
        else if (res.result.length === 0)
            throw new StatusException(
                {
                    error: this.errMessageUtilsTh.errVisitorRecordInNotFound
                    , result: null
                    , message: this.errMessageUtilsTh.errVisitorRecordInNotFound
                    , statusCode: 200
                }, 200)
        throw new StatusException(
            {
                error: null
                , result: this.errMessageUtilsTh.messageSuccess
                , message: this.errMessageUtilsTh.messageSuccess
                , statusCode: 200
            }, 200)
    }
}
