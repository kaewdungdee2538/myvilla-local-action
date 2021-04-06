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
            ,company_id,company_code
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
        const company_code = recordInObj.company_code
        const visitor_record_code = recordInObj.visitor_record_code;
        const visitor_slot_id = recordInObj.visitor_slot_id;
        const visitor_slot_number = recordInObj.visitor_slot_number;
        const card_id = recordInObj.card_id
        const card_code = recordInObj.card_code
        const card_name = recordInObj.card_name
        const employee_out_id = body.employee_out_id
        const employee_out_info = employeeObj
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
        sql1 += `,employee_out_id = $4`
        sql1 += `,employee_out_info = $5`
        sql1 += `,pos_id = $6`
        sql1 += ` where visitor_record_code = $7 and company_id = $8;`
        const query = {
            text: sql1
            , values: [img_visitor_out, guardhouse_out_id, guardhouse_out_code, employee_out_id, employee_out_info, pos_id, visitor_record_code, company_id]
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
