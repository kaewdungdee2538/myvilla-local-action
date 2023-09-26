import { Body, Injectable } from '@nestjs/common';
import { VsActionInCheckEmployeeMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_check_employee.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class ActionOutSaveService {
  constructor(
    private readonly dbconnecttion: dbConnection,
    private readonly errMessageUtilsTh: ErrMessageUtilsTH,
    private readonly vsActionInCheckEmployeeMiddleware: VsActionInCheckEmployeeMiddleWare,
  ) {}

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
        const employeeObj = await this.vsActionInCheckEmployeeMiddleware.CheckOutEmployee(
          body,
        );
        if (employeeObj)
          return await this.Save(body, files, getVisitorInInfo, employeeObj);
        else
          throw new StatusException(
            {
              error: this.errMessageUtilsTh.errEmployeeInfoNotFound,
              result: null,
              message: this.errMessageUtilsTh.errEmployeeInfoNotFound,
              statusCode: 200,
              slip_info: null,
            },
            200,
          );
      }
    }
    return getRecordIn;
  }

  async getVisitorRecordId(@Body() body) {
    const company_id = !body.company_id ? 0 : body.company_id;
    const card_code = !body.card_code ? '' : body.card_code;
    const card_name = !body.card_name ? '' : body.card_name;
    const visitor_slot_number = !body.visitor_slot_number
      ? 0
      : body.visitor_slot_number;

    let sql = `select func_getvs_uuid_card_or_slot($1,$2,$3,$4) as visitor_record_code;`;
    const query = {
      text: sql,
      values: [company_id, card_code, card_name, visitor_slot_number],
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
          error: this.errMessageUtilsTh.errVisitorRecordIDNotFound,
          result: null,
          message: this.errMessageUtilsTh.errVisitorRecordIDNotFound,
          statusCode: 200,
        },
        200,
      );
    return res.result[0].visitor_record_code;
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
            where visitor_record_code = $1)`;
    const query = {
      text: sql,
      values: [record_uuid],
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
        },
        200,
      );
    return res.result[0];
  }

  async Save(@Body() body, files: any, recordInObj: any, employeeObj: any) {
    const images = files;
    const company_id = recordInObj.company_id;

    const visitor_record_code = recordInObj.visitor_record_code;
    const visitor_slot_id = recordInObj.visitor_slot_id;
    const card_id = recordInObj.card_id;
    const employee_out_id = body.employee_out_id;
    const employee_out_info = JSON.stringify(employeeObj);
    const img_visitor_out = { images };
    const guardhouse_out_id = body.guardhouse_out_id;
    const guardhouse_out_code = body.guardhouse_out_code;
    const pos_id = body.pos_id ? body.pos_id.toString() : '';
    const tcpl_id = body.tcpl_id ? body.tcpl_id : null;
    // const parking_payment = body.sum_parking_total_after_discount
    //   ? parseInt(body.sum_parking_total_after_discount)
    //   : 0;
    // const overnight_fines = body.sum_overnight_fine_amount
    //   ? parseInt(body.sum_overnight_fine_amount)
    //   : 0;
    // const total_price = parking_payment + overnight_fines;
    const customer_payment = body.customer_payment
      ? parseInt(body.customer_payment)
      : 0;
    const payment_type_id = body.payment_type_id ? body.payment_type_id : 0;
    // const payment_flag = total_price > 0 ? 'Y' : 'N';
    // const discount_info =
    //   body.promotion_object && body.promotion_object != 'null'
    //     ? body.promotion_object
    //     : null;
    // const payment_info =
    //   body.payment_info && body.payment_info != 'null'
    //     ? body.payment_info
    //     : null;
    console.log(JSON.stringify(recordInObj));
    let sql1 = `WITH
    input_data AS (
      SELECT
        $1::JSONB AS img_visitor_out,
        $2::INTEGER AS guardhouse_out_id,
        $3::VARCHAR AS guardhouse_out_code,
        $4::INTEGER AS employee_out_id,
        $5::JSONB AS employee_out_info,
        $6::VARCHAR AS pos_id,
        $7::NUMERIC AS tcpl_id,
        $8::INTEGER AS payment_type_id,
        $9::NUMERIC AS customer_payment,
        $10::INTEGER AS company_id,
        $11::VARCHAR AS visitor_record_code
    )
    ,select_cal_log AS (
      SELECT
        tcpl_id
        ,COALESCE(CAST(tcpl_sum_data->>'sum_parking_total_after_discount' AS NUMERIC),0) AS sum_parking_total_after_discount
        ,COALESCE(CAST(tcpl_sum_data->>'sum_overnight_fine_amount' AS NUMERIC),0)+COALESCE(CAST(tcpl_sum_data->>'sum_other_fine_amount' AS NUMERIC),0) AS sum_fine_amount
        ,COALESCE(CAST(tcpl_sum_data->>'sum_total' AS NUMERIC),0) AS total_amount
        ,CASE WHEN COALESCE(CAST(tcpl_sum_data->>'sum_total' AS NUMERIC),0) > 0 THEN 'Y' ELSE 'N' END AS payment_flag
        ,tcpl_sum_data AS payment_info
        ,CAST(tcpl_sum_data->>'promotion_object' AS JSON) AS discount_info
      FROM t_calculate_parking_log
      WHERE tcpl_id = (SELECT tcpl_id FROM input_data)
    )
    update t_visitor_record set 
        img_visitor_out = (SELECT img_visitor_out FROM input_data)
        ,action_out_flag = 'Y'
        ,action_type = 'OUT'
        ,guardhouse_out_id = (SELECT guardhouse_out_id FROM input_data)
        ,guardhouse_out_code = (SELECT guardhouse_out_code FROM input_data)
        ,parking_out_datetime = current_timestamp
        ,datetime_action = current_timestamp
        ,employee_out_id = (SELECT employee_out_id FROM input_data)
        ,employee_out_info = (SELECT employee_out_info FROM input_data)
        ,pos_id = (SELECT pos_id FROM input_data)
        ,tcpl_id = (SELECT tcpl_id FROM input_data)
        ,payment_status_flag = (SELECT payment_flag FROM select_cal_log)
        ,parking_payment_datetime = 
        (select case when (SELECT total_amount FROM select_cal_log) > 0 then current_timestamp else null end)
        ,payment_type_id = (SELECT CASE WHEN (SELECT total_amount FROM select_cal_log) > 0 THEN (SELECT payment_type_id FROM input_data) ELSE 0 END AS payment_type_id)
        ,parking_payment = (SELECT sum_parking_total_after_discount FROM select_cal_log)
        ,overnight_fines = (SELECT sum_fine_amount FROM select_cal_log)
        ,total_price = (SELECT total_amount FROM select_cal_log)
        ,discount_info = (SELECT discount_info FROM select_cal_log)
        ,receipt_running = (select case when (SELECT company_id FROM input_data) > 0 then 
            (select coalesce(max(receipt_running)+1,1) from t_visitor_record
            where company_id = (SELECT company_id FROM input_data)
            and pos_id = (SELECT pos_id FROM input_data))
            else 0 end
            from t_visitor_record
            limit 1 )
        ,payment_info = (SELECT payment_info FROM select_cal_log)
        ,customer_payment =  (SELECT customer_payment FROM input_data)
        where company_id = (SELECT company_id FROM input_data) and visitor_record_code = (SELECT visitor_record_code FROM input_data);`;
    const query = {
      text: sql1,
      values: [
        img_visitor_out,
        guardhouse_out_id,
        guardhouse_out_code,
        employee_out_id,
        employee_out_info,
        pos_id,
        tcpl_id,
        payment_type_id,
        customer_payment,
        company_id,
        visitor_record_code,
      ],
    };
    let query2;
    if (visitor_slot_id) {
      let sql2 = `update m_visitor_slot set status_flag = 'N',visitor_record_code = null,update_by =$1,update_date = now() where visitor_slot_id = $2 and company_id = $3`;
      query2 = {
        text: sql2,
        values: [employee_out_id, visitor_slot_id, company_id],
      };
    } else {
      let sql2 = `update m_card set status_flag = 'N',visitor_record_code = null,update_by =$1,update_date = now() where card_id = $2 and company_id = $3`;
      query2 = {
        text: sql2,
        values: [employee_out_id, card_id, company_id],
      };
    }

    const allQuerys = [query, query2];

    const res = await this.dbconnecttion.savePgData(allQuerys);
    if (res.error)
      throw new StatusException(
        {
          error: res.error,
          result: null,
          message: this.errMessageUtilsTh.messageProcessFail,
          statusCode: 200,
          slip_info: null,
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

      return this.getSlipOutInfoFormBase(recordInObj.visitor_record_id,recordInObj.company_id)
   
  }


  async getSlipOutInfoFormBase(visitor_record_id: string,company_id: string) {

    let sql = `select 
    CONCAT(tvr.company_id,cartype_name_contraction,mpt.payment_type_code,guardhouse_out_id,TO_CHAR(current_timestamp,'YY'),TO_CHAR(current_timestamp,'MM'),TO_CHAR(current_timestamp,'DD'),to_char(tvr.receipt_running, 'FM9990999999')) AS receipt_no
    ,company_name
    ,pos_id
    ,guardhouse_in_code
    ,guardhouse_out_code
    ,visitor_record_id,visitor_record_code,ref_visitor_record_id,tbv_code
    ,CASE WHEN visitor_slot_id IS NOT NULL THEN 'SLOT' 
    WHEN card_id IS NOT NULL THEN 'CARD'
    ELSE 'BOOKING' END AS record_in_use_type
    ,visitor_slot_number,card_code,card_name
    ,cartype_name_th,cartype_name_en,cartype_category_info
    ,visitor_info,action_info
    ,home_info
    ,license_plate
    ,tvr.payment_type_id
    ,mpt.payment_type_name
    ,parking_payment
    ,overnight_fines
    ,losscard_fines
    ,total_price
    ,payment_info
    ,customer_payment
    ,discount_info AS promotion_info
    ,to_char(parking_in_datetime,'YYYY-MM-DD HH24:MI:SS') AS parking_in_datetime
    ,to_char(parking_payment_datetime,'YYYY-MM-DD HH24:MI:SS') AS parking_payment_datetime
    ,to_char(parking_out_datetime,'YYYY-MM-DD HH24:MI:SS') AS parking_out_datetime
    ,cardproblem_info
    ,case when cardproblem_flag = 'Y' then true else false end as cardproblem_status
    ,to_char(cardproblem_datetime,'YYYY-MM-DD HH24:MI:SS') AS cardproblem_datetime
    from t_visitor_record tvr
    left join m_payment_type mpt
    on tvr.payment_type_id = mpt.payment_type_id
    left join m_company mc
    on tvr.company_id = mc.company_id
    where visitor_record_id = $1
    and tvr.company_id = $2
    and action_type ='OUT'
    order by 1
    limit 1;
    `
    const query = {
        text: sql
        , values: [visitor_record_id, company_id]
    }
    const res = await this.dbconnecttion.getPgData(query);
    if (res.error)
        throw new StatusException(
            {
                error: res.error
                , result: null
                , message: this.errMessageUtilsTh.messageProcessFail
                , statusCode: 200
            }, 200)
    else if (res.result.length === 0) throw new StatusException(
        {
            error: this.errMessageUtilsTh.errSlipOutGetNotRow
            , result: null
            , message: this.errMessageUtilsTh.errSlipOutGetNotRow
            , statusCode: 200
        }, 200)
    throw new StatusException(
        {
            error: null
            , result: res.result[0]
            , message: this.errMessageUtilsTh.messageSuccess
            , statusCode: 200
        }, 200)
}
}
