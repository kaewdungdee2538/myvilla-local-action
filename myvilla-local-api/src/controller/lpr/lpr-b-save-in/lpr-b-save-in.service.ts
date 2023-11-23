import { Body, Injectable } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class LptBSaveInService {
    constructor(
        private readonly dbconnecttion: dbConnection
        , private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }

    async saveBookingIn(@Body() body, files: any, homeObj: any, checkTBVCodeObj: any,getEmployeeID:any,getCartype:any) {
        const visitor_record_code = await this.getUuidFormPg();
        const tbv_code = checkTBVCodeObj.tbv_code;
        const cartype_id = getCartype.cartype_id;
        const cartype_name_contraction = getCartype.cartype_name_contraction;
        const cartype_name_th = getCartype.cartype_name_th;
        const cartype_name_en = getCartype.cartype_name_en;
        const visitor_info = body.visitor_info;
        const action_info = body.action_info;
        const images = files;
        const img_visitor_in = {
            images
        }
        const company_id = body.company_id;
        const guardhouse_in_id = body.guardhouse_in_id;
        const guardhouse_in_code = body.guardhouse_in_code;
        const license_plate = body.license_plate;
        const employee_in_id = body.employee_in_id;
        const employee_in_info = getEmployeeID;
        const home_id = homeObj.home_id;
        const home_info = {
            home_id: homeObj.home_id
            , home_code: homeObj.home_code
            , home_name: homeObj.home_name
            , home_address: homeObj.home_address
            , home_type: homeObj.home_type
            , home_data: homeObj.home_data
            , home_remark: homeObj.home_remark
            , home_privilege_line_amount: homeObj.home_privilege_line_amount
            , home_privilege_card_amount: homeObj.home_privilege_card_amount
        };
        const cartype_category_id = body.cartype_category_id;
        const cartype_category_info = body.cartype_category_info;

        let sql1 = `
        insert into t_visitor_record
        (
            visitor_record_code,tbv_code
            ,cartype_id,cartype_name_contraction,cartype_name_th,cartype_name_en
            ,cartype_category_id,cartype_category_info
            ,visitor_info,action_info
            ,home_id,home_info
            ,guardhouse_in_id,guardhouse_in_code
            ,parking_in_datetime
            ,license_plate
            ,img_visitor_in
            ,employee_in_id,employee_in_info
            ,company_id
            ,datetime_action,action_type
        ) values(
            $1,$2
            ,$3,$4,$5,$6
            ,$7,$8
            ,$9,$10
            ,$11,$12
            ,$13,$14
            ,now()
            ,$15
            ,$16
            ,$17,$18
            ,$19
            ,now(),'IN'
        );`
        const query1 = {
            text: sql1
            , values: [
                visitor_record_code, tbv_code
                , cartype_id, cartype_name_contraction, cartype_name_th, cartype_name_en
                , cartype_category_id, cartype_category_info
                , visitor_info, action_info
                , home_id, home_info
                , guardhouse_in_id, guardhouse_in_code
                , license_plate
                , img_visitor_in
                , employee_in_id, employee_in_info
                , company_id
            ]
        }

        let sql2 = `update t_booking_visitor set tbv_status ='Y' 
        ,update_by = $1 ,update_date = current_timestamp
        where company_id = $2 and tbv_code = $3;`
        const query2 = {
            text:sql2
            ,values:[employee_in_id,company_id,tbv_code]
        }

        const querys = [query1,query2];
        const res = await this.dbconnecttion.savePgData(querys);
        if (res.error) throw new StatusException(
            {
                error: res.error
                , result: null
                , message: this.errMessageUtilsTh.messageProcessFail
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

    async saveBookingInByPassWithLpr(@Body() body, files: any,employeeObject:any) {

        
        const images = files;
        const img_visitor_in = {
            images
        }
        const company_id = body.company_id;
        const license_plate = body.license_plate;
        const guardhouse_in_id = body.guardhouse_in_id;
        const guardhouse_in_code = body.guardhouse_in_code;
        const employee_in_id = body.employee_in_id ? body.employee_in_id : 0;
        const employee_in_info = employeeObject;
        

        let sql1 = `
        WITH input_data AS (
            SELECT
            $1::NUMERIC AS company_id,
            $2::VARCHAR AS license_plate,
            $3::NUMERIC AS guardhouse_in_id,
            $4::VARCHAR AS guardhouse_in_code,
            $5::JSONB AS img_visitor_in,
            $6::NUMERIC AS employee_in_id,
            $7::JSONB AS employee_in_info,
            'IN'::VARCHAR AS action_type,
            current_timestamp AS action_time
        )	
        ,select_cartype AS (
            SELECT
                cartype_id
                ,cartype_name_contraction
                ,cartype_name_th
                ,cartype_name_en
                ,company_id
            FROM m_cartype
            WHERE cartype_info->>'for_lpr_booking' = 'true'
            AND company_id = (SELECT company_id FROM input_data)
            ORDER BY cartype_id
            LIMIT 1
        )
        ,select_booking AS (
            SELECT 
                tbv.tbv_id,tbv.tbv_code
                ,tbv.home_line_id
                ,mhl.home_id,mh.home_code,mh.home_name,mh.home_address,mh.home_type
                ,mh.home_data,mh.home_remark
                ,mh.home_privilege_line_amount,mh.home_privilege_card_amount
                ,json_build_object(
                    'home_id',mhl.home_id,
                    'home_code',mh.home_code,
                    'home_name',mh.home_name,
                    'home_address',mh.home_address,
                    'home_type',mh.home_type,
                    'home_data',mh.home_data,
                    'home_remark',mh.home_remark,
                    'home_privilege_line_amount',mh.home_privilege_line_amount,
                    'home_privilege_card_amount',mh.home_privilege_card_amount
                ) AS home_info
                ,tbv.tbv_start_datetime as booking_start_datetime
                ,tbv.tbv_end_datetime as booking_end_datetime
                ,tbv.tbv_license_plate as license_plate
                ,tbv.tbv_contact_person as person_name
                ,tbv.tbv_mobile_contact_person as person_mobile
                ,tbv.tbv_detail,tbv.tbv_data 
                ,case when tbv.tbv_status = 'Y' then true else false end as action_out_status
                ,mhl.home_line_first_name as host_first_name
                ,mhl.home_line_last_name as host_last_name
                ,mhl.home_line_mobile_phone as host_mobile
                ,tbv.create_by,tbv.create_date
                ,json_build_object(
                    'prefix_name','',
                    'first_name_th',tbv_contact_person,
                    'last_name_th','',
                    'identity_card','',
                    'gender','',
                    'birthdate','',
                    'religion',''
                ) AS visitor_info
                ,fun_generate_uuid('VS',8) AS visitor_record_code
                ,(SELECT company_id FROM input_data)
                ,(SELECT guardhouse_in_id FROM input_data)
                ,(SELECT guardhouse_in_code FROM input_data)
                ,(SELECT img_visitor_in FROM input_data)
                ,(SELECT employee_in_id FROM input_data)
                ,(SELECT employee_in_info FROM input_data)
                ,(SELECT action_type FROM input_data)
                ,(SELECT action_time FROM input_data)
                ,(SELECT cartype_id FROM select_cartype)
                ,(SELECT cartype_name_contraction FROM select_cartype)
                ,(SELECT cartype_name_th FROM select_cartype)
                ,(SELECT cartype_name_en FROM select_cartype)
            FROM t_booking_visitor tbv
            INNER JOIN m_home_line mhl ON tbv.home_line_id = mhl.home_line_id
            LEFT JOIN m_home mh ON mhl.home_id = mh.home_id
            WHERE tbv.delete_flag = 'N'
            AND tbv.tbv_status = 'N'
            AND current_timestamp < tbv_end_datetime
            AND tbv.company_id = (SELECT company_id FROM input_data)
            AND tbv_license_plate = (SELECT license_plate FROM input_data)
            ORDER BY tbv.tbv_id DESC 
            LIMIT 1
        ) 
        ,insert_record AS (
            INSERT INTO t_visitor_record
                (
                    visitor_record_code
                    ,tbv_code
                    ,visitor_info
                    ,cartype_id
                    ,cartype_name_contraction
			        ,cartype_name_th
			        ,cartype_name_en
                    ,home_id
                    ,home_info
                    ,guardhouse_in_id
                    ,guardhouse_in_code
                    ,parking_in_datetime
                    ,license_plate
                    ,img_visitor_in
                    ,employee_in_id
                    ,employee_in_info
                    ,company_id
                    ,datetime_action
                    ,action_type
                ) SELECT
                    visitor_record_code
                    ,tbv_code
                    ,visitor_info
                    ,cartype_id
                    ,cartype_name_contraction
			        ,cartype_name_th
			        ,cartype_name_en
                    ,home_id
                    ,home_info
                    ,guardhouse_in_id
                    ,guardhouse_in_code
                    ,action_time
                    ,license_plate
                    ,img_visitor_in
                    ,employee_in_id
                    ,employee_in_info
                    ,company_id
                    ,action_time
                    ,action_type
                FROM select_booking
                RETURNING  visitor_record_id,visitor_record_code,tbv_code,license_plate,fun_parking_datetime_format(parking_in_datetime) AS parking_in_datetime
        )
        ,update_booking AS (
                UPDATE t_booking_visitor SET 
                    tbv_status ='Y' 
                    ,update_by = (SELECT employee_in_id FROM select_booking) 
                    ,update_date = (SELECT action_time FROM select_booking)
                WHERE company_id = (SELECT company_id FROM select_booking) 
                AND tbv_code = (SELECT tbv_code FROM select_booking)
                AND tbv_id = (SELECT tbv_id FROM select_booking)
                RETURNING tbv_id,tbv_code
        )
        SELECT 
            *
        FROM insert_record ir
        LEFT JOIN update_booking ub ON ir.tbv_code = ub.tbv_code
        `
        const query = {
            text: sql1
            , values: [
                company_id,license_plate,guardhouse_in_id,guardhouse_in_code
                ,img_visitor_in,employee_in_id,employee_in_info
            ]
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
                error: this.errMessageUtilsTh.messageProcessFail
                , result: null
                , message: this.errMessageUtilsTh.messageProcessFail
                , statusCode: 200
            }, 200)
        else if (!res.result[0].visitor_record_id) throw new StatusException(
            {
                error: this.errMessageUtilsTh.messageProcessFail
                , result: null
                , message: this.errMessageUtilsTh.messageProcessFail
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
