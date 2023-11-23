import { Injectable } from '@nestjs/common';
import { throwIfEmpty } from 'rxjs/operators';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';

@Injectable()
export class BActionOutMiddleware {
  constructor(
    private readonly formatUtils: FormatDataUtils,
    private readonly errMessageUtilsTh: ErrMessageUtilsTH,
    private readonly dbconnecttion: dbConnection,
  ) {}

  async CheckSaveOut(body: any) {
    const checkvalues = this.checkValues(body);
    if (checkvalues) return checkvalues;
    return await this.checkValuesTBVCode(body);
  }


  async CheckSaveOutLPRByPass(body: any) {
    const checkvalues = this.checkValues(body);
    if (checkvalues) return checkvalues;
    return await this.checkValuesLPR(body);
  }

  checkValues(body: any) {
    // if (!body.visitor_record_id)
    //     return this.errMessageUtilsTh.errVisitorRecordIDNotFound
    // else if (this.formatUtils.HaveSpecialFormat(body.visitor_record_id))
    //     return this.errMessageUtilsTh.errVisitorRecordIdProhibitSpecial
    // else if (!this.formatUtils.IsNumber(body.visitor_record_id))
    //     return this.errMessageUtilsTh.errVisitorRecordIdNotNumber
    if (!body.company_id) return this.errMessageUtilsTh.errCompanyIDNotFound;
    else if (this.formatUtils.HaveSpecialFormat(body.company_id))
      return this.errMessageUtilsTh.errCompanyIDProhibitSpecial;
    else if (!this.formatUtils.IsNumber(body.company_id))
      return this.errMessageUtilsTh.errCompanyIDNotNumber;
    else if (this.formatUtils.HaveSpecialFormat(body.company_code))
      return this.errMessageUtilsTh.errCompanyCodeProhibitSpecial;
    else if (!body.guardhouse_out_id)
      return this.errMessageUtilsTh.errGuardHouseIDNotFound;
    else if (this.formatUtils.HaveSpecialFormat(body.guardhouse_out_id))
      return this.errMessageUtilsTh.errGuardHouseIDProhibitSpecial;
    else if (!this.formatUtils.IsNumber(body.guardhouse_out_id))
      return this.errMessageUtilsTh.errGuardHouseIDNotNumber;
    else if (this.formatUtils.HaveSpecialFormat(body.guardhouse_out_code))
      return this.errMessageUtilsTh.errGuardHouseCodeProhibitSpecial;
    // else if (!body.employee_out_id)
    //   return this.errMessageUtilsTh.errEmployeeIDNotFound;
    // else if (this.formatUtils.HaveSpecialFormat(body.employee_out_id))
    //   return this.errMessageUtilsTh.errEmployeeIDProhibitSpecail;
    // else if (!this.formatUtils.IsNumber(body.employee_out_id))
      // return this.errMessageUtilsTh.errEmployeeIDNotNumber;
    else if (!body.pos_id) return this.errMessageUtilsTh.errPosIDNotFound;
    else if (this.formatUtils.HaveSpecialFormat(body.pos_id))
      return this.errMessageUtilsTh.errPosIDProhibitSpecial;
    return null;
  }

  async checkValuesTBVCode(body: any) {
    if (!body.tbv_code)
      return this.errMessageUtilsTh.errฺBookingTbvCodeNotFound;
    else if (this.formatUtils.HaveSpecialFormat(body.tbv_code))
      return this.errMessageUtilsTh.errฺBookingTbvCodeProhibitSpecial;
    const TbvCodeInBase = await this.checkTbvCodeInbase(body);
    console.log(TbvCodeInBase);
    if (TbvCodeInBase) {
      if (!TbvCodeInBase.visitor_record_code)
        return this.errMessageUtilsTh.errBookingQRCodeNotIn;
    } else return this.errMessageUtilsTh.errBookingQRNotFound;
    return null;
  }

  async checkTbvCodeInbase(body: any) {
    const company_id = body.company_id;
    const tbv_code = body.tbv_code;

    let sql = `select tbv.tbv_code,tvr.visitor_record_code
        from 
        t_booking_visitor tbv
        left join t_visitor_record  tvr on tbv.tbv_code = tvr.tbv_code
        where tbv.delete_flag = 'N'
        and tbv.company_id = $1
        and tbv.tbv_code = $2
        limit 1
        ;`;
    const query = {
      text: sql,
      values: [company_id, tbv_code],
    };
    const res = await this.dbconnecttion.getPgData(query);
    if (res.error) {
      console.log(res.error);
      return null;
    } else if (res.result.length === 0) {
      console.log('Booking No data');
      return null;
    }
    return res.result[0];
  }

  async checkValuesLPR(body:any){
    if(!body.license_plate)
    return this.errMessageUtilsTh.errLicensePlateNotFound
    else if(this.formatUtils.HaveSpecialHomeFormat(body.license_plate))
    return this.errMessageUtilsTh.errLicensePlateProhibitSpecial
    // const lprInFromBase = await this.checkLprOutFrombase(body);
    // if (lprInFromBase) return lprInFromBase
    return null;
  }

  async checkLprOutFrombase(body: any) {
    const company_id = body.company_id;
    const license_plate = body.license_plate;

    let sql = ` 
        SELECT 
          visitor_record_id
          ,visitor_record_code
          ,license_plate
          ,parking_in_datetime
        FROM  t_visitor_record
        WHERE company_id = $1
        AND license_plate = $2
        AND action_out_flag = 'N'
        AND action_type = 'IN'
        ;`;
    const query = {
      text: sql,
      values: [company_id, license_plate],
    };
    const res = await this.dbconnecttion.getPgData(query);
    if (res.error) {
      console.log(res.error);
      return this.errMessageUtilsTh.errLicenseplateNotIn;
    } else if (res.result.length === 0) {
      console.log('Record in not found');
      return this.errMessageUtilsTh.errLicenseplateNotIn;
    }else if (res.result.length > 1){
      console.log('License plate more than 1 record');
      return this.errMessageUtilsTh.errLicenseplateInThanMoreOneRecord;
    }
    return null;
  }

  

  async CheckCalculateLog(body: any) {
    return await this.checkCalLog(body);
  }
  async checkCalLog(body: any) {
    if (body.tcpl_id && !this.formatUtils.IsNumber(body.tcpl_id))
      return this.errMessageUtilsTh.errTcplIdNotFound;
    else if ( body.tcpl_id &&
        this.formatUtils.IsNumber(body.tcpl_id) &&
        body.tcpl_id != 0 && !body.tcpl_code)
      return this.errMessageUtilsTh.errTcplCodeNotFound;
    else if (
      body.tcpl_id &&
      this.formatUtils.IsNumber(body.tcpl_id) &&
      body.tcpl_id != 0 &&
      body.tcpl_code.length == 0
    )
      return this.errMessageUtilsTh.errTcplCodeNotFound;
    else if (
      body.tcpl_id &&
      this.formatUtils.IsNumber(body.tcpl_id) &&
      body.tcpl_id != 0 &&
      this.formatUtils.HaveSpecialFormat(body.tcpl_code)
    )
      return this.errMessageUtilsTh.errTcplCodeProhibitSpecial;
    else if (
      body.tcpl_id &&
      this.formatUtils.IsNumber(body.tcpl_id) &&
      body.tcpl_id != 0 &&
      !this.formatUtils.HaveSpecialFormat(body.tcpl_code)
    ) {
      const error = await this.getCalculateLogInDataBase(
        body.tcpl_id,
        body.tcpl_code,
        body.company_id,
        body.tbv_code,
        body.payment_type_id,
      );
      if (error) return error;
    }
    return null;
  }
  async getCalculateLogInDataBase(
    tcpl_id: string,
    tcpl_code: string,
    company_id: string,
    tbv_code: string,
    payment_type_id: string,
  ) {
    let sql = `WITH 
        select_record_id AS (
			SELECT
                visitor_record_id 
            FROM t_visitor_record
            WHERE company_id = $3
            AND tbv_code = $4
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
      values: [tcpl_id, tcpl_code, company_id, tbv_code],
    };
    const res = await this.dbconnecttion.getPgData(query);
    if (res.error) {
      console.log(res.error);
      return this.errMessageUtilsTh.errTcplNotInBase;
    } else if (res.result.length === 0)
      return this.errMessageUtilsTh.errTcplNotInBase;

    try {
      const total_amount = parseInt(res.result[0].total_amount);
      const new_payment_type_id = this.formatUtils.IsNumber(payment_type_id)
        ? parseInt(payment_type_id)
        : 0;
      if (total_amount > 0 && new_payment_type_id === 0)
        return this.errMessageUtilsTh
          .errTotalAmountMoreThanZeroCanNotUsePaymentTypeZero;
    } catch {}

    return false;
  }
}
