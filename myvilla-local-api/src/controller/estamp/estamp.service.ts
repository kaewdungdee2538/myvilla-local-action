import { Injectable } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class EstampService {
    constructor(
        private readonly dbconnecttion: dbConnection
        , private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }

    async saveEstamp(body:any,pathCustomer:any){
        const visitor_record_id = body.visitor_record_id
        const images = {image_customer:pathCustomer}
        const employee_id = body.employee_id
        const company_id = body.company_id
        const guardhouse_id = body.guardhouse_id
        let sql = `WITH input_data AS (
			SELECT
				$1::NUMERIC AS visitor_record_id,
				$2::JSONB AS estamp_image,
				$3::NUMERIC AS employee_id,
				$4::NUMERIC AS company_id,
                $5::NUMERIC AS guardhouse_id,
				current_timestamp AS action_time
		)
		,select_estamp AS (
			SELECT
				estamp_id
				,estamp_code
				,estamp_name_th
				,estamp_name_en
				,estamp_remark
                ,(SELECT guardhouse_id FROM input_data)
			FROM m_estamp
			WHERE delete_flag = 'N'
			LIMIT 1
		)
		,update_estamp AS (
			UPDATE t_visitor_record SET
				estamp_id = (SELECT estamp_id FROM select_estamp)
				,estamp_info = (SELECT to_jsonb(select_estamp) AS estamp_info FROM select_estamp)
				,estamp_datetime = (SELECT action_time FROM input_data)
				,estamp_image = (SELECT estamp_image FROM input_data)
				,estamp_emp_id = (SELECT employee_id FROM input_data)
				,estamp_flag = 'Y'
			WHERE action_out_flag = 'N'
			AND visitor_record_id = (SELECT visitor_record_id FROM input_data)
			AND company_id = (SELECT company_id FROM input_data)
			RETURNING *
		)
		SELECT * FROM update_estamp
        ;`
        const query = {
            text:sql
            ,values:[
                visitor_record_id
                ,images
                ,employee_id
                ,company_id
                ,guardhouse_id
            ]
        }
        const result = await this.dbconnecttion.savePgData([query]);
        if (result.error) {
            throw new StatusException(
                {
                    error: result.error
                    , result: null
                    , message: this.errMessageUtilsTh.messageProcessFail
                    , statusCode: 200
                }, 200
            )
        } else {
            throw new StatusException(
                {
                    error: null
                    , result: this.errMessageUtilsTh.messageSuccessEn
                    , message: this.errMessageUtilsTh.messageSuccess
                    , statusCode: 200
                }, 200
            )
        }
    }
}
