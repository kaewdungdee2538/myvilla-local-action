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

    async saveCardloss(@Body() body, files: any) {
        const slotOrcardIsLoss = await this.checkSlotOrCardIsLoss(body);
        console.log(slotOrcardIsLoss);
        if (slotOrcardIsLoss.visitor_slot_id)
            return this.saveSlot(body, files, slotOrcardIsLoss);
        return this.saveCard(body, files, slotOrcardIsLoss);
    }

    async saveSlot(@Body() body, files: any, slotObj: any) {
        console.log('save slot')
        const images = files;
        const cardloss_image = { images }
        const image_vehicle = { images: { image_vehicle: files.image_customer } }
        const visitor_record_id = body.visitor_record_id;
        const site_id = body.site_id;
        const site_code = body.site_code;
        const guardhouse_id = body.guardhouse_id;
        const guardhouse_code = body.guardhouse_code;
        const employee_id = body.employee_id;
        const employee_info = body.employee_info;
        const cardloss_price = body.cardloss_price;
        const customer_payment = body.customer_payment;
        const change_money = body.change_money;
        const visitor_slot_id = slotObj.visitor_slot_id;
        const cardloss_info = {
            cardloss_price
            , customer_payment
            , change_money
            , employee_id
            , employee_info
        }
        const pos_id = body.pos_id;
        let sql1 = `update t_visitor_record`
        sql1 += ` set img_visitor_out = $1`
        sql1 += `,parking_out_datetime = now(),parking_payment_datetime = now()`
        sql1 += `,action_out_flag = 'Y'`
        sql1 += `,payment_status_flag = 'CARDLOSS'`
        sql1 += `,losscard_fines = $2`
        sql1 += `,total_price = $3`
        sql1 += `,guardhouse_out_id = $4`
        sql1 += `,guardhouse_out_code = $5`
        sql1 += `,employee_out_id = $6`
        sql1 += `,employee_out_info = $7`
        sql1 += `,cardloss_image = $8`
        sql1 += `,cardloss_info = $9`
        sql1 += `,cardloss_flag = 'Y',cardloss_datetime = now()`
        sql1 += `,datetime_action = now()`
        sql1 += `,action_type = 'OUT'`
        sql1 += `,pos_id = $10`
        sql1 += ` where visitor_record_id = $11`
        sql1 += ` and action_out_flag ='N';`


        const query1 = {
            text: sql1
            , values: [
                image_vehicle
                , cardloss_price
                , cardloss_price
                , guardhouse_id
                , guardhouse_code
                , employee_id
                , employee_info
                , cardloss_image
                , cardloss_info
                , pos_id
                , visitor_record_id
            ]
        }
        let sql2 = `update m_visitor_slot`
        sql2 += ` set visitor_record_id = null`
        sql2 += `,visitor_record_uuid = null`
        sql2 += `,update_by = $1`
        sql2 += `,update_date = now()`
        sql2 += `,status_flag = 'N'`
        sql2 += ` where site_id = $2`
        sql2 += ` and visitor_slot_id = $3;`
        const query2 = {
            text: sql2
            , values: [employee_id, site_id, visitor_slot_id]
        }
        const querys = [query1, query2]
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

    async saveCard(@Body() body, files: any, cardObj: any) {
        console.log('save slot')
        const images = files;
        const cardloss_image = { images }
        const image_vehicle = { images: { image_vehicle: files.image_customer } }
        const visitor_record_id = body.visitor_record_id;
        const site_id = body.site_id;
        const site_code = body.site_code;
        const guardhouse_id = body.guardhouse_id;
        const guardhouse_code = body.guardhouse_code;
        const employee_id = body.employee_id;
        const employee_info = body.employee_info;
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
            , employee_id
            , employee_info
        }
        const pos_id = body.pos_id;
        let sql1 = `update t_visitor_record`
        sql1 += ` set img_visitor_out = $1`
        sql1 += `,parking_out_datetime = now(),parking_payment_datetime = now()`
        sql1 += `,action_out_flag = 'Y'`
        sql1 += `,payment_status_flag = 'CARDLOSS'`
        sql1 += `,losscard_fines = $2`
        sql1 += `,total_price = $3`
        sql1 += `,guardhouse_out_id = $4`
        sql1 += `,guardhouse_out_code = $5`
        sql1 += `,employee_out_id = $6`
        sql1 += `,employee_out_info = $7`
        sql1 += `,cardloss_image = $8`
        sql1 += `,cardloss_info = $9`
        sql1 += `,cardloss_flag = 'Y',cardloss_datetime = now()`
        sql1 += `,datetime_action = now()`
        sql1 += `,action_type = 'OUT'`
        sql1 += `,pos_id = $10`
        sql1 += ` where visitor_record_id = $11`
        sql1 += ` and action_out_flag ='N';`


        const query1 = {
            text: sql1
            , values: [
                image_vehicle
                , cardloss_price
                , cardloss_price
                , guardhouse_id
                , guardhouse_code
                , employee_id
                , employee_info
                , cardloss_image
                , cardloss_info
                , pos_id
                , visitor_record_id
            ]
        }
        let sql2 = `update m_card`
        sql2 += ` set visitor_record_id = null`
        sql2 += `,visitor_record_uuid = null`
        sql2 += `,update_by = $1`
        sql2 += `,update_date = now()`
        sql2 += `,status_flag = 'N'`
        sql2 += `,delete_flag = 'Y'`
        sql2 += `,cardloss_flag = 'Y'`
        sql2 += `,cardloss_datetime = now()`
        sql2 += `,cardloss_info = $2`
        sql2 += ` where site_id = $3`
        sql2 += ` and card_id = $4;`
        const query2 = {
            text: sql2
            , values: [employee_id, cardloss_info, site_id, card_id]
        }
        const querys = [query1, query2]
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
        let sql = `select visitor_slot_id,visitor_slot_number`
        sql += `,card_id,card_code,card_name from t_visitor_record`
        sql += ` where visitor_record_id = $1 and action_out_flag = 'N';`;
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
}

