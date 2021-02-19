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

    async saveCardloss(@Body() body, files: any,employeeObj:any) {
        const slotOrcardIsLoss = await this.checkSlotOrCardIsLoss(body);
        console.log(slotOrcardIsLoss);
        if (slotOrcardIsLoss.visitor_slot_id)
            return await this.saveSlotAndOut(body, files, slotOrcardIsLoss,employeeObj);
        return await this.saveCardAndOut(body, files, slotOrcardIsLoss,employeeObj);
    }

    async saveCardlossNotOut(@Body() body,files:any,employeeObj:any){
        const cardObj = await this.checkRecordInBase(body)
        if(cardObj)
            return await this.saveCardNotOut(body,files,cardObj,employeeObj)
    }
    async saveSlotAndOut(@Body() body, files: any, slotObj: any,employeeObj:any) {
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
        const cardloss_price = body.cardloss_price;
        const customer_payment = body.customer_payment;
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

        let sql = `update t_visitor_record set action_out_flag = 'REPRINT' where visitor_record_id = $1;`
        const query = {
            text:sql
            , values:[visitor_record_id]
        }

        let sql1 = `insert into t_visitor_record(
        visitor_record_code,ref_visitor_record_id,tbv_code
        ,visitor_slot_id,visitor_slot_number,card_id,card_code,card_name
        ,cartype_id,cartype_name_contraction,cartype_name_th,cartype_name_en,cartype_category_id,cartype_category_info
        ,visitor_info,action_info,home_id,home_info,guardhouse_in_id,guardhouse_in_code
        ,parking_in_datetime,license_plate,img_visitor_in,employee_in_id,employee_in_info
        ,estamp_id,estamp_info,estamp_datetime,estamp_image,estamp_flag
        ,guardhouse_out_id,guardhouse_out_code,parking_out_datetime,img_visitor_out
        ,employee_out_id,employee_out_info,parking_payment_datetime,payment_status_flag
        ,losscard_fines,discount_info,parking_payment,total_price
        ,pos_id,action_out_flag,company_id,company_code,datetime_action,action_type
        ,cardproblem_info,cardproblem_image,cardproblem_flag,cardproblem_datetime
        ) select
        visitor_record_code,visitor_record_id as ref_visitor_record_id,tbv_code
        ,visitor_slot_id,visitor_slot_number,card_id,card_code,card_name
        ,cartype_id,cartype_name_contraction,cartype_name_th,cartype_name_en,cartype_category_id,cartype_category_info
        ,visitor_info,action_info,home_id,home_info,guardhouse_in_id,guardhouse_in_code
        ,parking_in_datetime,license_plate,img_visitor_in,employee_in_id,employee_in_info
        ,estamp_id,estamp_info,estamp_datetime,estamp_image,estamp_flag
        ,$1 as guardhouse_out_id,$2 as guardhouse_out_code,now() as parking_out_datetime,$3 as img_visitor_out
        ,$4 as employee_out_id,$5 as employee_out_info,now() as parking_payment_datetime,'REPRINT' as payment_status_flag
        ,$6 as losscard_fines,discount_info,parking_payment,$7 as total_price
        ,$8 as pos_id,'Y' as action_out_flag,$9 as company_id,$10 as company_code,now() as datetime_action,'REPRINT' as action_type
        ,$11 as cardproblem_info,$12 as cardproblem_image,'Y' as cardproblem_flag,now() as cardproblem_datetime
        from t_visitor_record
        where visitor_record_id = $13
        limit 1;
        `
        const query1 = {
            text: sql1
            , values: [
                guardhouse_id,guardhouse_code,image_vehicle
                ,employee_out_id,employee_out_info
                ,cardloss_price,cardloss_price
                ,pos_id,company_id,company_code
                ,cardloss_info,image_cardproblem
                ,visitor_record_id
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
        const querys = [query,query1, query2]
        const res = await this.dbconnecttion.savePgData(querys);
        if (res.error) throw new StatusException(
            {
                error: res.error
                , result: null
                , message: this.errMessageUtilsTh.messageProcessFail
                , statusCode: 400
            }, 400)
        else throw new StatusException(
                {
                    error: null
                    , result: this.errMessageUtilsTh.messageSuccess
                    , message: this.errMessageUtilsTh.messageSuccess
                    , statusCode: 200
                }, 200)
    }

    async saveCardAndOut(@Body() body, files: any, cardObj: any,employeeObj:any) {
        console.log('save card')
        const images = files;
        const image_cardproblem = { images }
        const image_vehicle = { images: { image_vehicle: files.image_customer } }
        const visitor_record_id = body.visitor_record_id;
        const visitor_record_code = cardObj.visitor_record_code;
        const company_id = body.company_id;
        const company_code = body.company_code;
        const guardhouse_id = body.guardhouse_id;
        const guardhouse_code = body.guardhouse_code;
        const employee_out_id = body.employee_out_id;
        const employee_out_info = employeeObj;
        const cardloss_price = body.cardloss_price;
        const customer_payment = body.customer_payment;
        const change_money = body.change_money;
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

        let sql0 = `update t_visitor_record set action_out_flag = 'CARDLOST' where visitor_record_id = $1;`
        const query0 = {
            text:sql0
            , values:[visitor_record_id]
        }

        let sql1 = `insert into t_visitor_record(
            visitor_record_code,ref_visitor_record_id,tbv_code
            ,visitor_slot_id,visitor_slot_number,card_id,card_code,card_name
            ,cartype_id,cartype_name_contraction,cartype_name_th,cartype_name_en,cartype_category_id,cartype_category_info
            ,visitor_info,action_info,home_id,home_info,guardhouse_in_id,guardhouse_in_code
            ,parking_in_datetime,license_plate,img_visitor_in,employee_in_id,employee_in_info
            ,estamp_id,estamp_info,estamp_datetime,estamp_image,estamp_flag
            ,guardhouse_out_id,guardhouse_out_code,parking_out_datetime,img_visitor_out
            ,employee_out_id,employee_out_info,parking_payment_datetime,payment_status_flag
            ,losscard_fines,discount_info,parking_payment,total_price
            ,pos_id,action_out_flag,company_id,company_code,datetime_action,action_type
            ,cardproblem_info,cardproblem_image,cardproblem_flag,cardproblem_datetime
            ) select
            (select fun_generate_uuid('VS',8)) as visitor_record_code,visitor_record_id as ref_visitor_record_id,tbv_code
            ,visitor_slot_id,visitor_slot_number,card_id,card_code,card_name
            ,cartype_id,cartype_name_contraction,cartype_name_th,cartype_name_en,cartype_category_id,cartype_category_info
            ,visitor_info,action_info,home_id,home_info,guardhouse_in_id,guardhouse_in_code
            ,parking_in_datetime,license_plate,img_visitor_in,employee_in_id,employee_in_info
            ,estamp_id,estamp_info,estamp_datetime,estamp_image,estamp_flag
            ,$1 as guardhouse_out_id,$2 as guardhouse_out_code,now() as parking_out_datetime,$3 as img_visitor_out
            ,$4 as employee_out_id,$5 as employee_out_info,now() as parking_payment_datetime,'CARDLOST' as payment_status_flag
            ,$6 as losscard_fines,discount_info,parking_payment,$7 as total_price
            ,$8 as pos_id,'Y' as action_out_flag,$9 as company_id,$10 as company_code,now() as datetime_action,'CARDLOST' as action_type
            ,$11 as cardproblem_info,$12 as cardproblem_image,'Y' as cardproblem_flag,now() as cardproblem_datetime
            from t_visitor_record
            where visitor_record_id = $13
            limit 1
            `


        const query1 = {
            text: sql1
            , values: [
                guardhouse_id,guardhouse_code,image_vehicle
                ,employee_out_id,employee_out_info
                ,cardloss_price,cardloss_price
                ,pos_id,company_id,company_code
                ,cardloss_info,image_cardproblem
                ,visitor_record_id
            ]
        }
        let sql2 = `update m_card`
        sql2 += ` set visitor_record_id = null`
        sql2 += `,visitor_record_code = null`
        sql2 += `,update_by = $1`
        sql2 += `,update_date = now()`
        sql2 += `,status_flag = 'N'`
        sql2 += `,delete_flag = 'Y'`
        sql2 += `,cardproblem_flag = 'Y'`
        sql2 += `,cardproblem_datetime = now()`
        sql2 += `,cardproblem_info = $2`
        sql2 += ` where company_id = $3`
        sql2 += ` and card_id = $4;`
        const query2 = {
            text: sql2
            , values: [employee_out_id, cardloss_info, company_id, card_id]
        }
        const querys = [query0,query1, query2]
        const res = await this.dbconnecttion.savePgData(querys);
        if (res.error) throw new StatusException(
            {
                error: res.error
                , result: null
                , message: this.errMessageUtilsTh.messageProcessFail
                , statusCode: 400
            }, 400)
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
        sql += `,estamp_id,estamp_info,estamp_datetime,estamp_image,estamp_flag`
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
                , statusCode: 400
            }, 400)
        else if (res.result.length === 0) throw new StatusException(
            {
                error: this.errMessageUtilsTh.errRecordInNotFound
                , result: null
                , message: this.errMessageUtilsTh.errRecordInNotFound
                , statusCode: 400
            }, 400)
        return res.result[0];
    }
    //---------------------------Save card loss not out
    async checkRecordInBase(@Body() body){
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
                , statusCode: 400
            }, 400)
        else if (res.result.length === 0) throw new StatusException(
            {
                error: this.errMessageUtilsTh.errRecordInNotFound
                , result: null
                , message: this.errMessageUtilsTh.errRecordInNotFound
                , statusCode: 400
            }, 400)
        return res.result[0]; 
    }

    async saveCardNotOut(@Body() body, files: any,cardObj: any,employeeObj:any){
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
        const cardloss_price = body.cardloss_price;
        const customer_payment = body.customer_payment;
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
        console.log(visitor_record_code_new)

        let sql0 = `update t_visitor_record set action_out_flag = 'CARDLOST' where visitor_record_id = $1;`
        const query0 = {
            text:sql0
            , values:[visitor_record_id]
        }

        let sql1 = `insert into t_visitor_record(
            visitor_record_code,ref_visitor_record_id,tbv_code
            ,visitor_slot_id,visitor_slot_number,card_id,card_code,card_name
            ,cartype_id,cartype_name_contraction,cartype_name_th,cartype_name_en,cartype_category_id,cartype_category_info
            ,visitor_info,action_info,home_id,home_info,guardhouse_in_id,guardhouse_in_code
            ,parking_in_datetime,license_plate,img_visitor_in,employee_in_id,employee_in_info
            ,estamp_id,estamp_info,estamp_datetime,estamp_image,estamp_flag
            ,guardhouse_out_id,guardhouse_out_code,parking_out_datetime,img_visitor_out
            ,employee_out_id,employee_out_info,parking_payment_datetime,payment_status_flag
            ,losscard_fines,discount_info,parking_payment,total_price
            ,pos_id,action_out_flag,company_id,company_code,datetime_action,action_type
            ,cardproblem_info,cardproblem_image,cardproblem_flag,cardproblem_datetime
            ) select
            $17 as visitor_record_code,visitor_record_id as ref_visitor_record_id,tbv_code
            ,visitor_slot_id,visitor_slot_number,$14 as card_id,$15 as card_code,$16 as card_name
            ,cartype_id,cartype_name_contraction,cartype_name_th,cartype_name_en,cartype_category_id,cartype_category_info
            ,visitor_info,action_info,home_id,home_info,guardhouse_in_id,guardhouse_in_code
            ,parking_in_datetime,license_plate,img_visitor_in,employee_in_id,employee_in_info
            ,estamp_id,estamp_info,estamp_datetime,estamp_image,estamp_flag
            ,$1 as guardhouse_out_id,$2 as guardhouse_out_code,now() as parking_out_datetime,$3 as img_visitor_out
            ,$4 as employee_out_id,$5 as employee_out_info,now() as parking_payment_datetime,'CARDLOST' as payment_status_flag
            ,$6 as losscard_fines,discount_info,parking_payment,$7 as total_price
            ,$8 as pos_id,'N' as action_out_flag,$9 as company_id,$10 as company_code,now() as datetime_action,'CARDLOST' as action_type
            ,$11 as cardproblem_info,$12 as cardproblem_image,'Y' as cardproblem_flag,now() as cardproblem_datetime
            from t_visitor_record
            where visitor_record_id = $13
            limit 1
            `


        const query1 = {
            text: sql1
            , values: [
                guardhouse_id,guardhouse_code,image_vehicle
                ,employee_out_id,employee_out_info
                ,cardloss_price,cardloss_price
                ,pos_id,company_id,company_code
                ,cardloss_info,image_cardproblem
                ,visitor_record_id
                ,card_id_after,card_code_after,card_name_after
                ,visitor_record_code_new
            ]
        }

        let sql2 = `update m_card`
        sql2 += ` set visitor_record_id = null`
        sql2 += `,visitor_record_code = null`
        sql2 += `,update_by = $1`
        sql2 += `,update_date = now()`
        sql2 += `,status_flag = 'N'`
        sql2 += `,delete_flag = 'Y'`
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
            text:sql3
            ,values:[visitor_record_code_new,employee_out_id,company_id,card_id_after]
        }
        const querys = [query0,query1, query2, query3]
        const res = await this.dbconnecttion.savePgData(querys);
        if (res.error) throw new StatusException(
            {
                error: res.error
                , result: null
                , message: this.errMessageUtilsTh.messageProcessFail
                , statusCode: 400
            }, 400)
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

