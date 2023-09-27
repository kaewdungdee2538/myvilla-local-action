import { Injectable } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class CardManageService {
  constructor(
    private dbconnecttion: dbConnection,
    private readonly formatUtils: FormatDataUtils,
    private readonly errMessageUtilsTh: ErrMessageUtilsTH,
    ) {}

  async getCardInDataBase(inputObj: any) {
    const company_id = inputObj.company_id;
    const card_code = inputObj.card_code;
    const card_name = inputObj.card_name;
    let sql = `select * from m_card where delete_flag ='N' and company_id = $1 and (card_code = $2 or card_name = $3);`;
    const query = {
      text: sql,
      values: [company_id, card_code, card_name],
    };
    const res = await this.dbconnecttion.getPgData(query);
    if (res.error) {
      console.log(res.error);
      return false;
    } else if (res.result.length === 0) return false;
    return true;
  }

  async getCardCheckIn(inputObj: any) {
    const company_id = inputObj.company_id;
    const card_code = inputObj.card_code;
    const card_name = inputObj.card_name;
    let sql = `select * from m_card where status_flag = 'Y' and delete_flag ='N' and company_id = $1 and (card_code = $2 or card_name = $3);`;
    const query = {
      text: sql,
      values: [company_id, card_code, card_name],
    };
    const res = await this.dbconnecttion.getPgData(query);
    if (res.error) {
      console.log(res.error);
      return false;
    } else if (res.result.length === 0) return false;
    return true;
  }

  async getCalculateLogInDataBase(
    tcpl_id: string,
    tcpl_code: string,
    company_id: string,
    slot: string,
    card: string,
    payment_type_id: string,
  ) {
    let sql = `WITH 
        select_slot AS (
            SELECT 
            	visitor_record_code 
            FROM m_visitor_slot
            WHERE company_id = $3
            AND visitor_slot_number = $4
			LIMIT 1
		)
        ,select_card AS (
            SELECT 
            	visitor_record_code 
            FROM m_card
            WHERE company_id = $3
            AND card_code = $5
			LIMIT 1
        )
		,select_record_code AS (
			SELECT
				CASE WHEN (SELECT visitor_record_code FROM select_slot) IS NOT NULL THEN
			(SELECT visitor_record_code FROM select_slot) ELSE 
			(SELECT visitor_record_code FROM select_card) END AS visitor_record_code
		)
		,select_record_id AS (
			SELECT 
				visitor_record_id
			FROM t_visitor_record
			WHERE visitor_record_code = (SELECT visitor_record_code FROM select_record_code)
			LIMIT 1
		)
		SELECT 
			tcpl_id
            ,COALESCE(CAST(tcpl_sum_data->>'sum_total' AS NUMERIC),0) AS total_amount
		FROM t_calculate_parking_log
		WHERE delete_flag ='N'
		AND visitor_record_id = (SELECT visitor_record_id FROM select_record_id) 
		AND tcpl_id = $1
		AND tcpl_code = $2
		LIMIT 1;
        `;
    const query = {
      text: sql,
      values: [tcpl_id, tcpl_code, company_id, slot, card],
    };
    const res = await this.dbconnecttion.getPgData(query);
    if (res.error) {
      console.log(res.error);
      return this.errMessageUtilsTh.errTcplNotInBase;
    } else if (res.result.length === 0) return this.errMessageUtilsTh.errTcplNotInBase;

    try{
        const total_amount = parseInt(res.result[0].total_amount)
        const new_payment_type_id = this.formatUtils.IsNumber(payment_type_id) ? parseInt(payment_type_id) : 0
      //  if (total_amount === 0 && new_payment_type_id > 0){
      //   return this.errMessageUtilsTh.errTotalAmountEqualZeroCanNotUsePaymentTypeNotEqualZero
      //  }
        if  (total_amount > 0 && new_payment_type_id === 0) return this.errMessageUtilsTh.errTotalAmountMoreThanZeroCanNotUsePaymentTypeZero;
       
    }catch{}
   
    return false 
  }

  async getPaymentTypeId(payment_type_id: number) {
    let sql = `
    SELECT
        payment_type_id
    FROM m_payment_type
    WHERE payment_type_id = $1
    LIMIT 1;`;
    const query = {
      text: sql,
      values: [payment_type_id],
    };
    const res = await this.dbconnecttion.getPgData(query);
    if (res.error) {
      console.log(res.error);
      return false;
    } else if (res.result.length === 0) return false;
    return true;
  }
}
