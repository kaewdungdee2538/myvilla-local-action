import { Body, Injectable } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { GetSlipService } from 'src/controller/visitor/get-slip/get-slip.service';

@Injectable()
export class BActionOutService {
  constructor(
    private readonly dbconnecttion: dbConnection,
    private readonly errMessageUtilsTh: ErrMessageUtilsTH,
    private readonly getSlipService: GetSlipService,
  ) {}

  async saveBActionOut(@Body() body, files: any, employeeObj: any) {
    return this.saveOut(body, files, employeeObj);
  }

  async saveOut(@Body() body, files: any, employeeObj: any) {
    const images = files;
    const img_visitor_out = { images };
    const guardhouse_out_id = body.guardhouse_out_id;
    const guardhouse_out_code = body.guardhouse_out_code;
    const pos_id = body.pos_id ? body.pos_id.toString() : '';
    const company_id = body.company_id;
    const tbv_code = body.tbv_code;
    const employee_out_id = body.employee_out_id;
    const employee_out_info = JSON.stringify(employeeObj);
    // const visitor_record_id = body.visitor_record_id
    const tcpl_id = body.tcpl_id ? body.tcpl_id : null;
    const parking_payment = body.sum_parking_total_after_discount
      ? parseInt(body.sum_parking_total_after_discount)
      : 0;
    const overnight_fines = body.sum_overnight_fine_amount
      ? parseInt(body.sum_overnight_fine_amount)
      : 0;
    const total_price = parking_payment + overnight_fines;
    const customer_payment = body.customer_payment
      ? parseInt(body.customer_payment)
      : 0;
    const payment_type_id = body.payment_type_id ? body.payment_type_id : 0;
    let sql1 = `WITH
        input_data AS (
            SELECT
            $1::JSONB AS img_visitor_out,
            $2::INTEGER AS guardhouse_out_id,
            $3::VARCHAR AS guardhouse_out_code,
            $4::VARCHAR AS pos_id,
            $5::INTEGER AS employee_out_id,
            $6::JSONB AS employee_out_info,
            $7::NUMERIC AS tcpl_id,
            $8::INTEGER AS payment_type_id,
            $9::NUMERIC AS customer_payment,
            $10::INTEGER AS company_id,
            $11::VARCHAR AS tbv_code
        )
        ,select_cal_log AS (
            SELECT
              tcpl_id
              ,visitor_record_id
              ,COALESCE(CAST(tcpl_sum_data->>'sum_parking_total_after_discount' AS NUMERIC),0) AS sum_parking_total_after_discount
              ,COALESCE(CAST(tcpl_sum_data->>'sum_overnight_fine_amount' AS NUMERIC),0)+COALESCE(CAST(tcpl_sum_data->>'sum_other_fine_amount' AS NUMERIC),0) AS sum_fine_amount
              ,COALESCE(CAST(tcpl_sum_data->>'sum_total' AS NUMERIC),0) AS total_amount
              ,CASE WHEN COALESCE(CAST(tcpl_sum_data->>'sum_total' AS NUMERIC),0) > 0 THEN 'Y' ELSE 'N' END AS payment_flag
              ,tcpl_sum_data AS payment_info
              ,CAST(tcpl_sum_data->>'promotion_object' AS JSON) AS discount_info
            FROM t_calculate_parking_log
            WHERE tcpl_id = (SELECT tcpl_id FROM input_data)
          )
        ,select_running_no AS (
            (select case when (SELECT company_id FROM input_data) > 0 then 
            (select coalesce(max(receipt_running)+1,1) FROM t_visitor_record
            WHERE company_id = (SELECT company_id FROM input_data)
            AND guardhouse_out_id = (SELECT guardhouse_out_id FROM input_data)
            AND payment_type_id = (SELECT CASE WHEN (SELECT total_amount FROM select_cal_log) > 0 THEN (SELECT payment_type_id FROM input_data) ELSE 0 END AS payment_type_id)
            AND cartype_id = (SELECT cartype_id FROM t_visitor_record WHERE company_id = (SELECT company_id FROM input_data) and tbv_code = (SELECT tbv_code FROM input_data) LIMIT 1)
            AND parking_payment_datetime::date = current_timestamp::date
            )
            else 0 end AS running_no
            from t_visitor_record
            limit 1 )
          )
        update t_visitor_record set 
        img_visitor_out = (SELECT img_visitor_out FROM input_data)
        ,action_out_flag = 'Y'
        ,action_type = 'OUT'
        ,guardhouse_out_id = (SELECT guardhouse_out_id FROM input_data)
        ,guardhouse_out_code = (SELECT guardhouse_out_code FROM input_data)
        ,parking_out_datetime = current_timestamp
        ,datetime_action = current_timestamp
        ,pos_id = (SELECT pos_id FROM input_data)
        ,employee_out_id = (SELECT employee_out_id FROM input_data)
        ,employee_out_info = (SELECT employee_out_info FROM input_data)
        ,tcpl_id = (SELECT tcpl_id FROM input_data)
        ,payment_status_flag =  (SELECT payment_flag FROM select_cal_log)
        ,parking_payment_datetime = current_timestamp 
        ,payment_type_id = (SELECT CASE WHEN (SELECT total_amount FROM select_cal_log) > 0 THEN (SELECT payment_type_id FROM input_data) ELSE 0 END AS payment_type_id)
        ,parking_payment = (SELECT sum_parking_total_after_discount FROM select_cal_log)
        ,overnight_fines = (SELECT sum_fine_amount FROM select_cal_log)
        ,total_price = (SELECT total_amount FROM select_cal_log)
        ,discount_info = (SELECT discount_info FROM select_cal_log)
        ,receipt_running = (SELECT running_no FROM select_running_no)
        ,payment_info = (SELECT payment_info FROM select_cal_log)
        ,customer_payment =  (SELECT customer_payment FROM input_data)
        where company_id = (SELECT company_id FROM input_data) 
        and tbv_code = (SELECT tbv_code FROM input_data)
        RETURNING visitor_record_id,company_id;`;
    const query = {
      text: sql1,
      values: [
        img_visitor_out,
        guardhouse_out_id,
        guardhouse_out_code,
        pos_id,
        employee_out_id,
        employee_out_info,
        tcpl_id,
        payment_type_id,
        customer_payment,
        company_id,
        tbv_code,
      ],
    };

    const res = await this.dbconnecttion.getPgData(query);

    if (res.error)
      throw new StatusException(
        {
          error: res.error,
          result: null,
          message: this.errMessageUtilsTh.messageProcessFail,
          statusCode: 200,
        },
        200,
      );
    else if (res.result.length === 0)
      throw new StatusException(
        {
          error: this.errMessageUtilsTh.errVisitorRecordInNotFound,
          result: null,
          message: this.errMessageUtilsTh.errVisitorRecordInNotFound,
          statusCode: 200,
          slip_info: null,
        },
        200,
      );
      const dbResult = res.result[0]
      const visitorRecordId = dbResult[0].visitor_record_id
      const companyId = dbResult[0].company_id

      let visitor_record_id = 0
      try{visitor_record_id = parseInt(visitorRecordId)}catch{}
    
      return this.getSlipService.getSlipOutInfoFormBase(
        visitor_record_id,
        companyId,
      );
  }
}
