import { Body, Injectable } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class VisitorSaveCardlossService {
    constructor(
        private readonly dbconnecttion: dbConnection
        , private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }

    async saveCardloss(@Body() body, files: any, employeeObj: any) {
        const slotOrcardIsLoss = await this.checkSlotOrCardIsLoss(body);
        console.log(slotOrcardIsLoss);
        if (slotOrcardIsLoss.visitor_slot_id)
            return await this.saveSlotAndOut(body, files, slotOrcardIsLoss, employeeObj);
        return await this.saveCardAndOut(body, files, slotOrcardIsLoss, employeeObj);
    }

    async saveCardlossNotOut(@Body() body, files: any, employeeObj: any) {
        const cardObj = await this.checkRecordInBase(body)
        if (cardObj)
            return await this.saveCardNotOut(body, files, cardObj, employeeObj)
    }
    async saveSlotAndOut(@Body() body, files: any, slotObj: any, employeeObj: any) {
        console.log('save slot')
        const images = files;
        const image_cardproblem = { images }
        const image_vehicle = { images: { image_vehicle: files.image_customer } }
        const visitor_record_id = body.visitor_record_id;
        const company_id = body.company_id;
        const company_code = body.company_code;
        const guardhouse_id = body.guardhouse_id;
        const guardhouse_code = body.guardhouse_code;
        const employee_out_id = body.employee_out_id;
        const employee_out_info = employeeObj;
        const cardloss_price = body.cardloss_price ? parseInt(body.cardloss_price) : 0;
        const customer_payment = body.customer_payment ? parseInt(body.customer_payment) : 0;
        const change_money = body.change_money;
        const visitor_slot_id = slotObj.visitor_slot_id;
        const cardloss_info = {
            cardloss_price
            , customer_payment
            , change_money
            , employee_out_id
            , employee_out_info
            , visitor_record_id
        }
        const pos_id = body.pos_id;
        const tcpl_id = body.tcpl_id ? body.tcpl_id : null;
        const parking_payment = body.sum_parking_total_after_discount ? parseInt(body.sum_parking_total_after_discount) : 0;
        const overnight_fines = body.sum_overnight_fine_amount ? parseInt(body.sum_overnight_fine_amount) : 0;
        const total_price = parking_payment + overnight_fines + cardloss_price;
        const payment_type_id = body.payment_type_id ? body.payment_type_id : 0;
        const discount_info = body.promotion_object && body.promotion_object != 'null' ? body.promotion_object : null;
        const payment_info = body.payment_info && body.payment_info != 'null' ? body.payment_info : null;
        const payment_flag = total_price > 0 ? 'Y' : 'N';

        let sql = `update t_visitor_record set action_out_flag = 'REPRINT' where visitor_record_id = $1;`
        const query = {
            text: sql
            , values: [visitor_record_id]
        }

        let sql1 = `insert into t_visitor_record(
        visitor_record_code,ref_visitor_record_id,tbv_code
        ,visitor_slot_id,visitor_slot_number,card_id,card_code,card_name
        ,cartype_id,cartype_name_contraction,cartype_name_th,cartype_name_en,cartype_category_id,cartype_category_info
        ,visitor_info,action_info,home_id,home_info,guardhouse_in_id,guardhouse_in_code
        ,parking_in_datetime,license_plate,img_visitor_in,employee_in_id,employee_in_info
        ,estamp_id,estamp_info,estamp_datetime,estamp_image,estamp_flag
        ,guardhouse_out_id,guardhouse_out_code,parking_out_datetime,img_visitor_out
        ,employee_out_id,employee_out_info,parking_payment_datetime
        ,losscard_fines,tcpl_id,discount_info,payment_info,parking_payment,overnight_fines,total_price
        ,pos_id,action_out_flag,company_id,datetime_action,action_type
        ,cardproblem_info,cardproblem_image,cardproblem_flag,cardproblem_datetime
        ,payment_type_id,payment_status_flag,receipt_running,customer_payment
        ) select
        fun_generate_uuid('VS',8) as visitor_record_code,visitor_record_id as ref_visitor_record_id,tbv_code
        ,visitor_slot_id,visitor_slot_number,card_id,card_code,card_name
        ,cartype_id,cartype_name_contraction,cartype_name_th,cartype_name_en,cartype_category_id,cartype_category_info
        ,visitor_info,action_info,home_id,home_info,guardhouse_in_id,guardhouse_in_code
        ,parking_in_datetime,license_plate,img_visitor_in,employee_in_id,employee_in_info
        ,estamp_id,estamp_info,estamp_datetime,estamp_image,estamp_flag
        ,$1 as guardhouse_out_id,$2 as guardhouse_out_code,current_timestamp as parking_out_datetime,$3 as img_visitor_out
        ,$4 as employee_out_id,$5 as employee_out_info,current_timestamp as parking_payment_datetime
        ,$6 as losscard_fines
        ,$7 as tcpl_id
        ,$8 as discount_info
        ,$9 as payment_info
        ,$10 as parking_payment
        ,$11 as overnight_fines
        ,$12 as total_price
        ,$13 as pos_id,'Y' as action_out_flag
        ,$14 as company_id,current_timestamp as datetime_action,'REPRINT' as action_type
        ,$15 as cardproblem_info,$16 as cardproblem_image,'Y' as cardproblem_flag,current_timestamp as cardproblem_datetime
        ,$17 as payment_type_id
        ,$18 as payment_status_flag
        ,(select case when $10 > 0 then 
            (select coalesce(max(receipt_running)+1,1) from t_visitor_record
            where company_id = $14
            and pos_id = $13::varchar)
            else 0 end
            from t_visitor_record
            limit 1 ) as receipt_running
        ,$19 as customer_payment
        from t_visitor_record
        where visitor_record_id = $20
        and company_id = $14
        limit 1;
        `
        const query1 = {
            text: sql1
            , values: [
                guardhouse_id, guardhouse_code, image_vehicle
                , employee_out_id, employee_out_info
                , cardloss_price
                , tcpl_id
                , discount_info
                , payment_info
                , parking_payment
                , overnight_fines
                , total_price
                , pos_id
                , company_id
                , cardloss_info, image_cardproblem
                , payment_type_id
                , payment_flag
                , customer_payment
                , visitor_record_id
            ]
        }
        let sql2 = `update m_visitor_slot`
        sql2 += ` set visitor_record_id = null`
        sql2 += `,visitor_record_code = null`
        sql2 += `,update_by = $1`
        sql2 += `,update_date = now()`
        sql2 += `,status_flag = 'N'`
        sql2 += ` where company_id = $2`
        sql2 += ` and visitor_slot_id = $3;`
        const query2 = {
            text: sql2
            , values: [employee_out_id, company_id, visitor_slot_id]
        }
        const querys = [query, query1, query2]
        const res = await this.dbconnecttion.savePgData(querys);
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

    async saveCardAndOut(@Body() body, files: any, cardObj: any, employeeObj: any) {
        console.log('save card')
        const images = files;
        const image_cardproblem = { images }
        const image_vehicle = { images: { image_vehicle: files.image_customer } }
        const visitor_record_id = body.visitor_record_id;
        const visitor_record_code = cardObj.visitor_record_code;
        const company_id = body.company_id;
        const guardhouse_id = body.guardhouse_id;
        const guardhouse_code = body.guardhouse_code;
        const employee_out_id = body.employee_out_id;
        const employee_out_info = employeeObj;
        const cardloss_price = body.cardloss_price ? parseInt(body.cardloss_price) : 0;
        const customer_payment = body.customer_payment ? parseInt(body.customer_payment) : 0;
        const change_money = body.customer_payment ? parseInt(body.change_money) : 0;
        const card_id = cardObj.card_id;
        const card_code = cardObj.card_code;
        const card_name = cardObj.card_name;
        const cardloss_info = {
            cardloss_price
            , customer_payment
            , change_money
            , employee_out_id
            , employee_out_info
            , visitor_record_id
            , visitor_record_code
        }
        const pos_id = body.pos_id;
        const tcpl_id = body.tcpl_id ? body.tcpl_id : null;
        const parking_payment = body.sum_parking_total_after_discount ? parseInt(body.sum_parking_total_after_discount) : 0;
        const overnight_fines = body.sum_overnight_fine_amount ? parseInt(body.sum_overnight_fine_amount) : 0;
        const total_price = parking_payment + overnight_fines + cardloss_price;
        const payment_type_id = body.payment_type_id ? body.payment_type_id : 0;
        const discount_info = body.promotion_object && body.promotion_object != 'null' ? body.promotion_object : null;
        const payment_info = body.payment_info && body.payment_info != 'null' ? body.payment_info : null;
        const payment_flag = total_price > 0 ? 'Y' : 'N';

        let sql0 = `update t_visitor_record set action_out_flag = 'CARDLOST' where visitor_record_id = $1;`
        const query0 = {
            text: sql0
            , values: [visitor_record_id]
        }

        let sql1 = `insert into t_visitor_record(
            visitor_record_code,ref_visitor_record_id,tbv_code
            ,visitor_slot_id,visitor_slot_number,card_id,card_code,card_name
            ,cartype_id,cartype_name_contraction,cartype_name_th,cartype_name_en,cartype_category_id,cartype_category_info
            ,visitor_info,action_info,home_id,home_info,guardhouse_in_id,guardhouse_in_code
            ,parking_in_datetime,license_plate,img_visitor_in,employee_in_id,employee_in_info
            ,estamp_id,estamp_info,estamp_datetime,estamp_image,estamp_flag
            ,guardhouse_out_id,guardhouse_out_code,parking_out_datetime,img_visitor_out
            ,employee_out_id,employee_out_info,parking_payment_datetime
            ,losscard_fines,tcpl_id,discount_info,payment_info,parking_payment,overnight_fines,total_price
            ,pos_id,action_out_flag,company_id,datetime_action,action_type
            ,cardproblem_info,cardproblem_image,cardproblem_flag,cardproblem_datetime
            ,payment_type_id,payment_status_flag,receipt_running,customer_payment
            ) select
            (select fun_generate_uuid('VS',8)) as visitor_record_code,visitor_record_id as ref_visitor_record_id,tbv_code
            ,visitor_slot_id,visitor_slot_number,card_id,card_code,card_name
            ,cartype_id,cartype_name_contraction,cartype_name_th,cartype_name_en,cartype_category_id,cartype_category_info
            ,visitor_info,action_info,home_id,home_info,guardhouse_in_id,guardhouse_in_code
            ,parking_in_datetime,license_plate,img_visitor_in,employee_in_id,employee_in_info
            ,estamp_id,estamp_info,estamp_datetime,estamp_image,estamp_flag
            ,$1 as guardhouse_out_id,$2 as guardhouse_out_code,current_timestamp as parking_out_datetime,$3 as img_visitor_out
            ,$4 as employee_out_id,$5 as employee_out_info,current_timestamp as parking_payment_datetime
            ,$6 as losscard_fines
            ,$7 as tcpl_id
            ,$8 as discount_info
            ,$9 as payment_info
            ,$10 as parking_payment
            ,$11 as overnight_fines
            ,$12 as total_price
            ,$13 as pos_id,'Y' as action_out_flag
            ,$14 as company_id,current_timestamp as datetime_action,'CARDLOST' as action_type
            ,$15 as cardproblem_info,$16 as cardproblem_image,'Y' as cardproblem_flag,current_timestamp as cardproblem_datetime
            ,$17 as payment_type_id
            ,$18 as payment_status_flag
            ,(select case when $10 > 0 then 
                (select coalesce(max(receipt_running)+1,1) from t_visitor_record
                where company_id = $14
                and pos_id = $13::varchar)
                else 0 end
                from t_visitor_record
                limit 1 ) as receipt_running
            ,$19 as customer_payment
            from t_visitor_record
            where visitor_record_id = $20
            and company_id = $14
            limit 1
            `

        const query1 = {
            text: sql1
            , values: [
                guardhouse_id, guardhouse_code, image_vehicle
                , employee_out_id, employee_out_info
                , cardloss_price
                , tcpl_id
                , discount_info
                , payment_info
                , parking_payment
                , overnight_fines
                , total_price
                , pos_id
                , company_id
                , cardloss_info, image_cardproblem
                , payment_type_id
                , payment_flag
                , customer_payment
                , visitor_record_id
            ]
        }
        console.log(query1);
        let sql2 = `update m_card`
        sql2 += ` set visitor_record_id = null`
        sql2 += `,visitor_record_code = null`
        sql2 += `,update_by = $1`
        sql2 += `,update_date = now()`
        sql2 += `,status_flag = 'N'`
        sql2 += `,cardproblem_flag = 'Y'`
        sql2 += `,cardproblem_datetime = now()`
        sql2 += `,cardproblem_info = $2`
        sql2 += ` where company_id = $3`
        sql2 += ` and card_id = $4;`
        const query2 = {
            text: sql2
            , values: [employee_out_id, cardloss_info, company_id, card_id]
        }
        const querys = [query0, query1, query2]
        const res = await this.dbconnecttion.savePgData(querys);
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


    async checkSlotOrCardIsLoss(@Body() body) {
        const visitor_record_id = body.visitor_record_id;
        let sql = `select visitor_record_id,visitor_record_code,tbv_code`
        sql += `,visitor_slot_id,visitor_slot_number`
        sql += `,card_id,card_code,card_name `
        sql += `,cartype_id,cartype_name_contraction,cartype_name_th,cartype_name_en`
        sql += `,cartype_category_id,cartype_category_info`
        sql += `,visitor_info,action_info`
        sql += `,home_id,home_info,guardhouse_in_id,guardhouse_in_code`
        sql += ',parking_in_datetime'
        sql += `,license_plate`
        sql += `,img_visitor_in`
        sql += `,employee_in_id,employee_in_info`
        sql += `,estamp_id,estamp_datetime,estamp_image,estamp_flag`
        sql += ` from t_visitor_record`
        sql += ` where tbv_code is null and visitor_record_id = $1 and action_out_flag = 'N';`;
        const query = {
            text: sql
            , values: [visitor_record_id]
        }

        const res = await this.dbconnecttion.getPgData(query);
        if (res.error) throw new StatusException(
            {
                error: res.error
                , result: null
                , message: this.errMessageUtilsTh.messageProcessFail
                , statusCode: 200
            }, 200)
        else if (res.result.length === 0) throw new StatusException(
            {
                error: this.errMessageUtilsTh.errRecordInNotFound
                , result: null
                , message: this.errMessageUtilsTh.errRecordInNotFound
                , statusCode: 200
            }, 200)
        return res.result[0];
    }
    //---------------------------Save card loss not out
    async checkRecordInBase(@Body() body) {
        const visitor_record_id = body.visitor_record_id;
        let sql = `select card_id,card_code,card_name,visitor_record_code `
        sql += ` from t_visitor_record `
        sql += ` where visitor_record_id = $1 and action_out_flag = 'N';`
        const query = {
            text: sql
            , values: [visitor_record_id]
        }
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error) throw new StatusException(
            {
                error: res.error
                , result: null
                , message: this.errMessageUtilsTh.messageProcessFail
                , statusCode: 200
            }, 200)
        else if (res.result.length === 0) throw new StatusException(
            {
                error: this.errMessageUtilsTh.errRecordInNotFound
                , result: null
                , message: this.errMessageUtilsTh.errRecordInNotFound
                , statusCode: 200
            }, 200)
        return res.result[0];
    }

    async saveCardNotOut(@Body() body, files: any, cardObj: any, employeeObj: any) {
        console.log('save card not out')
        const images = files;
        const image_cardproblem = { images }
        const image_vehicle = { images: { image_vehicle: files.image_customer } }
        const visitor_record_id = body.visitor_record_id;
        const visitor_record_code = cardObj.visitor_record_code;
        const visitor_record_code_new = await this.getUuidFormPg();
        const company_id = body.company_id;
        const company_code = body.company_code;
        const guardhouse_id = body.guardhouse_id;
        const guardhouse_code = body.guardhouse_code;
        const employee_out_id = body.employee_out_id;
        const employee_out_info = employeeObj;
        const cardloss_price = body.cardloss_price ? parseInt(body.cardloss_price) : 0;
        const customer_payment = body.customer_payment ? parseInt(body.customer_payment) : 0;
        const change_money = body.change_money;
        const card_id_before = cardObj.card_id;
        const card_code_before = cardObj.card_code;
        const card_name_before = cardObj.card_name;
        const card_id_after = body.card_id_after;
        const card_code_after = body.card_code_after;
        const card_name_after = body.card_name_after;
        const cardloss_info = {
            cardloss_price
            , customer_payment
            , change_money
            , employee_out_id
            , employee_out_info
            , visitor_record_id
            , card_id_before
            , card_code_before
            , card_name_before
            , card_id_after
            , card_code_after
            , card_name_after
            , visitor_record_code
        }
        const pos_id = body.pos_id;
        const tcpl_id = body.tcpl_id ? body.tcpl_id : null;
        const parking_payment = body.sum_parking_total_after_discount ? parseInt(body.sum_parking_total_after_discount) : 0;
        const overnight_fines = body.sum_overnight_fine_amount ? parseInt(body.sum_overnight_fine_amount) : 0;
        const total_price = parking_payment + overnight_fines + cardloss_price;
        const payment_type_id = body.payment_type_id ? body.payment_type_id : 0;
        const discount_info = body.promotion_object && body.promotion_object != 'null' ? body.promotion_object : null;
        const payment_info = body.payment_info && body.payment_info != 'null' ? body.payment_info : null;
        const payment_flag = total_price > 0 ? 'Y' : 'N';
        console.log(visitor_record_code_new)

        let sql0 = `update t_visitor_record set action_out_flag = 'CARDLOST' where visitor_record_id = $1;`
        const query0 = {
            text: sql0
            , values: [visitor_record_id]
        }

        let sql1 = `insert into t_visitor_record(
            visitor_record_code,ref_visitor_record_id,tbv_code
            ,visitor_slot_id,visitor_slot_number,card_id,card_code,card_name
            ,cartype_id,cartype_name_contraction,cartype_name_th,cartype_name_en,cartype_category_id,cartype_category_info
            ,visitor_info,action_info,home_id,home_info,guardhouse_in_id,guardhouse_in_code
            ,parking_in_datetime,license_plate,img_visitor_in,employee_in_id,employee_in_info
            ,estamp_id,estamp_info,estamp_datetime,estamp_image,estamp_flag
            ,guardhouse_out_id,guardhouse_out_code,parking_out_datetime,img_visitor_out
            ,employee_out_id,employee_out_info,parking_payment_datetime
            ,losscard_fines,total_price
            ,pos_id,action_out_flag,company_id,datetime_action,action_type
            ,cardproblem_info,cardproblem_image,cardproblem_flag,cardproblem_datetime
            ,payment_status_flag,parking_payment,discount_info,payment_info
            ,payment_type_id,receipt_running,tcpl_id
            ,customer_payment
            ) select
            $16 as visitor_record_code,visitor_record_id as ref_visitor_record_id,tbv_code
            ,visitor_slot_id,visitor_slot_number,$13 as card_id,$14 as card_code,$15 as card_name
            ,cartype_id,cartype_name_contraction,cartype_name_th,cartype_name_en,cartype_category_id,cartype_category_info
            ,visitor_info,action_info,home_id,home_info,guardhouse_in_id,guardhouse_in_code
            ,parking_in_datetime,license_plate,img_visitor_in,employee_in_id,employee_in_info
            ,estamp_id,estamp_info,estamp_datetime,estamp_image,estamp_flag
            ,$1 as guardhouse_out_id,$2 as guardhouse_out_code,current_timestamp as parking_out_datetime,$3 as img_visitor_out
            ,$4 as employee_out_id,$5 as employee_out_info,current_timestamp as parking_payment_datetime
            ,$6 as losscard_fines,$7 as total_price
            ,$8 as pos_id,'N' as action_out_flag,$9 as company_id ,current_timestamp as datetime_action,'CARDLOST' as action_type
            ,$10 as cardproblem_info,$11 as cardproblem_image,'Y' as cardproblem_flag,current_timestamp as cardproblem_datetime
            ,$17,$18,$19,$20
            ,$21,(select case when $7 > 0 then 
                (select coalesce(max(receipt_running)+1,1) from t_visitor_record
                where company_id = $22
                and pos_id = $8::varchar)
                else 0 end
                from t_visitor_record
                limit 1 ) as receipt_running
            ,$22 as tcpl_id,$23 as customer_payment
            from t_visitor_record
            where visitor_record_id = $12
            and company_id = $24
            limit 1
            `


        const query1 = {
            text: sql1
            , values: [
                guardhouse_id, guardhouse_code, image_vehicle
                , employee_out_id, employee_out_info
                , cardloss_price, total_price
                , pos_id, company_id
                , cardloss_info, image_cardproblem
                , visitor_record_id
                , card_id_after, card_code_after, card_name_after
                , visitor_record_code_new
                , payment_flag, parking_payment, discount_info, payment_info
                , payment_type_id
                , tcpl_id
                , customer_payment
                , company_id
            ]
        }

        let sql2 = `update m_card`
        sql2 += ` set visitor_record_id = null`
        sql2 += `,visitor_record_code = null`
        sql2 += `,update_by = $1`
        sql2 += `,update_date = now()`
        sql2 += `,status_flag = 'N'`
        sql2 += `,cardproblem_flag = 'Y'`
        sql2 += `,cardproblem_datetime = now()`
        sql2 += `,cardproblem_info = $2`
        sql2 += ` where company_id = $3`
        sql2 += ` and card_id = $4;`
        const query2 = {
            text: sql2
            , values: [employee_out_id, cardloss_info, company_id, card_id_before]
        }
        let sql3 = `update m_card`
        sql3 += ` set visitor_record_code = $1`
        sql3 += `,update_by = $2`
        sql3 += `,update_date = now(),status_flag = 'Y'`
        sql3 += ` where company_id = $3`
        sql3 += ` and card_id = $4;`
        const query3 = {
            text: sql3
            , values: [visitor_record_code_new, employee_out_id, company_id, card_id_after]
        }


        const querys = [query0, query1, query2, query3]
        const res = await this.dbconnecttion.savePgData(querys);
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


    async getUuidFormPg() {
        const sql = `select fun_generate_uuid('VS',8) as _uuid;`
        const res = await this.dbconnecttion.getPgData(sql);
        if (res.error)
            return res.error;
        else if (res.result.length === 0)
            return null;
        else
            return res.result[0]._uuid;
    }


}

