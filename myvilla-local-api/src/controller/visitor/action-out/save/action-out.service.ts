import { Body, Injectable } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class ActionOutSaveService {
    constructor(
        private readonly dbconnecttion: dbConnection
        , private readonly errMessageUtilsTh: ErrMessageUtilsTH
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
                return await this.Save(body, files, getVisitorInInfo);
            }

        }
        return getRecordIn;
    }

    async getVisitorRecordId(@Body() body) {
        const site_id = !body.site_id ? 0 : body.site_id;
        const card_code = !body.card_code ? '' : body.card_code;
        const card_name = !body.card_name ? '' : body.card_name;
        const visitor_slot_number = !body.visitor_slot_number ? 0 : body.visitor_slot_number;

        let sql = `select getvs_uuid_card_or_slot($1,$2,$3,$4) as visitor_record_uuid;`
        const query = {
            text: sql
            , values: [site_id, card_code, card_name, visitor_slot_number]
        }
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error)
            throw new StatusException(
                {
                    error: res.error
                    , result: null
                    , message: this.errMessageUtilsTh.messageProcessFail
                    , statusCode: 400
                }, 400
            )
        else if (res.result.length === 0)
            throw new StatusException(
                {
                    error: this.errMessageUtilsTh.errVisitorRecordIDNotFound
                    , result: null
                    , message: this.errMessageUtilsTh.errVisitorRecordIDNotFound
                    , statusCode: 400
                }, 400
            )
        return res.result[0].visitor_record_uuid
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
            ,site_id,site_code
            ,guardhouse_in_id,guardhouse_in_code
            ,employee_in_id,employee_in_info
            ,visitor_record_uuid
            from t_visitor_record
            where visitor_record_uuid = $1)`
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
                    , statusCode: 400
                }, 400
            )
        else if (res.result.length === 0)
            throw new StatusException(
                {
                    error: this.errMessageUtilsTh.errVisitorRecordInNotFound
                    , result: null
                    , message: this.errMessageUtilsTh.errVisitorRecordInNotFound
                    , statusCode: 400
                }, 400
            )
        return res.result[0]
    }
    
    async Save(@Body() body, files: any, recordInObj: any){
        const images = files;
        const site_id = recordInObj.site_id
        const site_code = recordInObj.site_code
        const visitor_record_uuid = recordInObj.visitor_record_uuid;
        const visitor_slot_id = recordInObj.visitor_slot_id;
        const visitor_slot_number = recordInObj.visitor_slot_number;
        const card_id = recordInObj.card_id
        const card_code = recordInObj.card_code
        const card_name = recordInObj.card_name
        const employee_out_id = body.employee_out_id
        const employee_out_info = body.employee_out_info
        const img_visitor_out = { images }
        const guardhouse_out_id = body.guardhouse_out_id
        const guardhouse_out_code = body.guardhouse_out_code;
        const pos_id = body.pos_id;
        console.log(JSON.stringify(recordInObj));
        let sql1 = `update t_visitor_record set `
        sql1 += `img_visitor_out = $1`
        sql1 += `,action_out_flag = 'Y'`
        sql1 += `,action_type = 'OUT'`
        sql1 += `,guardhouse_out_id = $2`
        sql1 += `,guardhouse_out_code = $3`
        sql1 += `,parking_out_datetime = now()`
        sql1 += `,datetime_action = now()`
        sql1 += `,pos_id = $4`
        sql1 += ` where visitor_record_uuid = $5;`
        const query = {
            text:sql1
            , values:[img_visitor_out,guardhouse_out_id,guardhouse_out_code,pos_id,visitor_record_uuid]
        }
        let query2;
        if (visitor_slot_id) {
            let sql2 = `update m_visitor_slot set status_flag = 'N',visitor_record_uuid = null,update_by =$1,update_date = now() where visitor_slot_id = $2 and site_id = $3`;
            query2 = {
                text: sql2
                , values: [employee_out_id, visitor_slot_id, site_id]
            }
        } else {
            let sql2 = `update m_card set status_flag = 'N',visitor_record_uuid = null,update_by =$1,update_date = now() where card_id = $2 and site_id = $3`;
            query2 = {
                text: sql2
                , values: [employee_out_id, card_id, site_id]
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
                    , statusCode: 400
                }, 400)
        else if (res.result.length === 0)
            throw new StatusException(
                {
                    error: this.errMessageUtilsTh.errVisitorRecordInNotFound
                    , result: null
                    , message: this.errMessageUtilsTh.errVisitorRecordInNotFound
                    , statusCode: 400
                }, 400)
        throw new StatusException(
            {
                error: null
                , result: this.errMessageUtilsTh.messageSuccess
                , message: this.errMessageUtilsTh.messageSuccess
                , statusCode: 200
            }, 200)
    }

    // async Save(@Body() body, files: any, recordInObj: any) {
    //     const images = files;

    //     const ref_id = recordInObj.visitor_record_id;
    //     const visitor_slot_id = recordInObj.visitor_slot_id;
    //     const visitor_slot_number = recordInObj.visitor_slot_number;
    //     const card_id = recordInObj.card_id
    //     const card_code = recordInObj.card_code
    //     const card_name = recordInObj.card_name
    //     const cartype_id = recordInObj.cartype_id
    //     const cartype_name_contraction = recordInObj.cartype_name_contraction
    //     const cartype_name_th = recordInObj.cartype_name_th
    //     const cartype_name_en = recordInObj.cartype_name_en
    //     const cartype_category_id = recordInObj.cartype_category_id
    //     const cartype_category_info = recordInObj.cartype_category_info
    //     const visitor_info = recordInObj.visitor_info
    //     const action_info = recordInObj.action_info
    //     const home_id = recordInObj.home_id
    //     const home_info = recordInObj.home_info
    //     const license_plate = recordInObj.license_plate
    //     const img_visitor_in = recordInObj.img_visitor_in
    //     const parking_in_datetime = recordInObj.parking_in_datetime
    //     const site_id = recordInObj.site_id
    //     const site_code = recordInObj.site_code
    //     const guardhouse_in_id = recordInObj.guardhouse_in_id
    //     const guardhouse_in_code = recordInObj.guardhouse_in_code
    //     const img_visitor_out = { images }
    //     const guardhouse_out_id = body.guardhouse_out_id
    //     const guardhouse_out_code = body.guardhouse_out_code;
    //     const employee_in_id = recordInObj.employee_in_id;
    //     const employee_in_info = recordInObj.employee_in_info
    //     const employee_out_id = body.employee_out_id
    //     const employee_out_info = body.employee_out_info
    //     let sql = `insert into t_visitor_record(`
    //     sql += `ref_id`
    //     sql += `,visitor_slot_id,visitor_slot_number`
    //     sql += `,card_id,card_code,card_name`
    //     sql += `,cartype_id,cartype_name_contraction,cartype_name_th,cartype_name_en`
    //     sql += `,cartype_category_id,cartype_category_info`
    //     sql += `,visitor_info,action_info `
    //     sql += `,home_id,home_info`
    //     sql += `,license_plate`
    //     sql += `,img_visitor_in`
    //     sql += `,parking_in_datetime`
    //     sql += `,site_id,site_code`
    //     sql += `,guardhouse_in_id,guardhouse_in_code`
    //     sql += `,datetime_action`
    //     sql += `,parking_out_datetime`
    //     sql += `,action_out_flag`
    //     sql += `,img_visitor_out`
    //     sql += `,guardhouse_out_id`
    //     sql += `,guardhouse_out_code`
    //     sql += `,employee_in_id,employee_in_info`
    //     sql += `,employee_out_id,employee_out_info`
    //     sql += `,action_type`
    //     sql += `) values(`
    //     sql += `$1`
    //     sql += `,$2,$3`
    //     sql += `,$4,$5,$6`
    //     sql += `,$7,$8,$9,$10`
    //     sql += `,$11,$12`
    //     sql += `,$13,$14`
    //     sql += `,$15,$16`
    //     sql += `,$17`
    //     sql += `,$18`
    //     sql += `,$19`
    //     sql += `,$20,$21`
    //     sql += `,$22,$23`
    //     sql += `,now()`
    //     sql += `,now()`
    //     sql += `,'Y'`
    //     sql += `,$24`
    //     sql += `,$25`
    //     sql += `,$26`
    //     sql += `,$27,$28`
    //     sql += `,$29,$30`
    //     sql += `,'OUT'`
    //     sql += `);`
    //     const query = {
    //         text: sql
    //         , values: [
    //             ref_id
    //             , visitor_slot_id, visitor_slot_number
    //             , card_id, card_code, card_name
    //             , cartype_id, cartype_name_contraction, cartype_name_th, cartype_name_en
    //             , cartype_category_id, cartype_category_info
    //             , visitor_info, action_info
    //             , home_id, home_info
    //             , license_plate
    //             , img_visitor_in
    //             , parking_in_datetime
    //             , site_id
    //             , site_code
    //             , guardhouse_in_id, guardhouse_in_code
    //             , img_visitor_out
    //             , guardhouse_out_id
    //             , guardhouse_out_code
    //             , employee_in_id, employee_in_info
    //             , employee_out_id, employee_out_info
    //         ]
    //     }
    //     let query2;
    //     if (visitor_slot_id) {
    //         let sql2 = `update m_visitor_slot set status_flag = 'N',visitor_record_id = null,update_by =$1,update_date = now() where visitor_slot_id = $2 and site_id = $3`;
    //         query2 = {
    //             text: sql2
    //             , values: [employee_out_id, visitor_slot_id, site_id]
    //         }
    //     } else {
    //         let sql2 = `update m_card set status_flag = 'N',visitor_record_id = null,update_by =$1,update_date = now() where card_id = $2 and site_id = $3`;
    //         query2 = {
    //             text: sql2
    //             , values: [employee_out_id, card_id, site_id]
    //         }
    //     }

    //     const allQuerys = [query, query2]

    //     const res = await this.dbconnecttion.savePgData(allQuerys);
    //     if (res.error)
    //         throw new StatusException(
    //             {
    //                 error: res.error
    //                 , result: null
    //                 , message: this.errMessageUtilsTh.messageProcessFail
    //                 , statusCode: 400
    //             }, 400)
    //     else if (res.result.length === 0)
    //         throw new StatusException(
    //             {
    //                 error: this.errMessageUtilsTh.errVisitorRecordInNotFound
    //                 , result: null
    //                 , message: this.errMessageUtilsTh.errVisitorRecordInNotFound
    //                 , statusCode: 400
    //             }, 400)
    //     throw new StatusException(
    //         {
    //             error: null
    //             , result: this.errMessageUtilsTh.messageSuccess
    //             , message: this.errMessageUtilsTh.messageSuccess
    //             , statusCode: 200
    //         }, 200)
    // }
}
