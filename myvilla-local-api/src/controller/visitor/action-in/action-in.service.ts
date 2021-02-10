import { Body, Injectable, UploadedFiles } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class ActionInService {
    constructor(
        private readonly dbconnecttion: dbConnection
        , private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }

    async ActionSaveIn(@UploadedFiles() files, @Body() body, visitor_slot_id: string, cardObj: any, getHomeID: any) {
        const visitor_slot_number = body.visitor_slot_number;
        const card_id = !cardObj ? null : cardObj.card_id;
        const card_code = !cardObj ? null : cardObj.card_code;
        const card_name = !cardObj ? null : cardObj.card_name;
        const cartype_id = body.cartype_id;
        const cartype_name_contraction = body.cartype_name_contraction;
        const cartype_name_th = body.cartype_name_th;
        const cartype_name_en = body.cartype_name_en;
        const visitor_info = body.visitor_info;
        const action_info = body.action_info;
        const images = files;
        const img_visitor_in = {
            images
        }
        const site_id = body.site_id;
        const site_code = body.site_code;
        const guardhouse_in_id = body.guardhouse_in_id;
        const guardhouse_in_code = body.guardhouse_in_code;
        const license_plate = body.license_plate;
        const employee_in_id = body.employee_in_id;
        const employee_in_info = body.employee_in_info;
        const home_id = getHomeID.home_id;
        const home_info = getHomeID.home_info;
        const cartype_category_id = body.cartype_category_id;
        const cartype_category_info = body.cartype_category_info;
        console.log(getHomeID);

        let sql1 = `insert into t_visitor_record(`;
        sql1 += 'visitor_slot_id'
        sql1 += ',card_code,card_name'
        sql1 += ',cartype_id,cartype_name_contraction,cartype_name_th,cartype_name_en'
        sql1 += ',visitor_info'
        sql1 += ',action_info'
        sql1 += ',img_visitor_in'
        sql1 += ',action_type'
        sql1 += ',site_id,site_code'
        sql1 += ',guardhouse_in_id,guardhouse_in_code'
        sql1 += ',datetime_action'
        sql1 += ',license_plate'
        sql1 += ',visitor_slot_number'
        sql1 += ',employee_in_id'
        sql1 += ',employee_in_info'
        sql1 += ',home_id,home_info'
        sql1 += ',card_id'
        sql1 += ',cartype_category_id,cartype_category_info'
        sql1 += ') values('
        sql1 += `$1`
        sql1 += `,$2,$3`
        sql1 += `,$4,$5,$6,$7`
        sql1 += `,$8`
        sql1 += `,$9`
        sql1 += `,$10`
        sql1 += `,'IN'`,
            sql1 += `,$11,$12`
        sql1 += `,$13,$14`
        sql1 += ',now()'
        sql1 += `,$15`
        sql1 += `,$16`
        sql1 += `,$17`
        sql1 += `,$18`
        sql1 += `,$19,$20`
        sql1 += `,$21`
        sql1 += `,$22,$23`
        sql1 += ');'
        const query1 = {
            text: sql1
            , values: [
                visitor_slot_id
                , card_code
                , card_name
                , cartype_id
                , cartype_name_contraction
                , cartype_name_th
                , cartype_name_en
                , visitor_info
                , action_info
                , img_visitor_in
                , site_id
                , site_code
                , guardhouse_in_id
                , guardhouse_in_code
                , license_plate
                , visitor_slot_number
                , employee_in_id
                , employee_in_info
                , home_id
                , home_info
                , card_id
                , cartype_category_id
                , cartype_category_info
            ]
        }
        let query2;
        if (visitor_slot_id) {
            let sql2 = `update m_visitor_slot set status_flag = 'Y'`;
            sql2 += ',update_by = $1,update_date = now()'
            sql2 += ',visitor_record_id = (select max(visitor_record_id) from t_visitor_record)'
            sql2 += ` where visitor_slot_id = $2`
            query2 = {
                text: sql2
                , values: [employee_in_id, visitor_slot_id]
            }
        } else {
            let sql = `update m_card set status_flag = 'Y'`
            sql += ',update_by = $1,update_date = now()'
            sql += ',visitor_record_id = (select max(visitor_record_id) from t_visitor_record)'
            sql += ' where card_id = $2'
            query2 = {
                text: sql
                , values: [employee_in_id, card_id]
            }
        }

        const querys = [query1, query2];
        const result = await this.dbconnecttion.savePgData(querys);
        if (result.error) {
            throw new StatusException(
                {
                    error: result.error
                    , result: null
                    , message: this.errMessageUtilsTh.messageProcessFail
                    , statusCode: 400
                }, 400
            )
        } else {
            throw new StatusException(
                {
                    error: this.errMessageUtilsTh.messageSuccess
                    , result: null
                    , message: this.errMessageUtilsTh.messageSuccess
                    , statusCode: 200
                }, 200
            )
        }
    }

    async getVisitorSlotID(@Body() body) {
        const visitor_slot_number = body.visitor_slot_number;
        const site_id = body.site_id;
        const guardhouse_in_id = body.guardhouse_in_id;
        let sql = `select visitor_slot_id,visitor_slot_number `
        sql += ',visitor_slot_code,visitor_slot_name'
        sql += ' from m_visitor_slot'
        sql += ` where visitor_slot_number = $1`
        sql += ` and site_id = $2 and guardhouse_id =$3;`;
        const quesy = {
            text: sql
            , values: [
                visitor_slot_number
                , site_id
                , guardhouse_in_id
            ]
        }
        const result = await this.dbconnecttion.getPgData(quesy);
        if (result.error)
            return result.error;
        else if (result.result.length === 0)
            return null;
        else
            return result.result;
    }

    async getCardID(@Body() body) {
        const site_id = body.site_id;
        const card_code = body.card_code;
        const card_name = body.card_name;
        let sql = `select card_id,card_code,card_name`
        sql += ` from m_card`
        sql += ` where delete_flag = 'N' and status_flag = 'N'`
        sql += ` and site_id = $1`
        sql += ` and (card_code = $2 or card_name = $3);`
        const query = {
            text: sql
            , values: [site_id, card_code, card_name]
        }
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error)
            return res.error;
        else if (res.result.length === 0)
            return null;
        else
            return res.result;
    }
}
