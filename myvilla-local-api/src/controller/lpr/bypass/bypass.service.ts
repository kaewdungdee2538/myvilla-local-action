import { Body,HttpService, Injectable } from '@nestjs/common';
import { AxiosResponse } from "axios";
import * as moment from 'moment'
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { LoadSettingLocalUtils } from 'src/utils/load_setting_local.utils';
import { CalTimediffService } from 'src/controller/cal-timediff/cal-timediff.service';
import { configfile } from 'src/conf/config-setting';

@Injectable()
export class BypassService {
  constructor(
    private readonly dbconnecttion: dbConnection,
    private readonly errMessageUtilsTh: ErrMessageUtilsTH,
    private readonly localSettingUtils: LoadSettingLocalUtils,
    private readonly httpService: HttpService
  ) {}

  async saveOutByPass(@Body() body, files: any, employeeObj: any,recordIn:any) {
    console.log(recordIn)
    const images = files;
    const img_visitor_out = { images };
    const guardhouse_out_id = body.guardhouse_out_id;
    const guardhouse_out_code = body.guardhouse_out_code;
    const pos_id = body.pos_id ? body.pos_id.toString() : '';
    const company_id = body.company_id;
    const employee_out_id = body.employee_out_id ? body.employee_out_id : 0;
    const employee_out_info = JSON.stringify(employeeObj);

    const tcpl_id = recordIn?.summary_data ? parseInt(recordIn.summary_data.tcpl_id) : 0;
    const visitor_record_id = recordIn ? parseInt(recordIn.visitor_record_id) : 0;
    let sql1 = `
    WITH input_data AS (
    SELECT
        $1::JSONB AS img_visitor_out,
        $2::NUMERIC AS guardhouse_out_id,
        $3::VARCHAR AS guardhouse_out_code,
        $4::VARCHAR AS pos_id,
        $5::NUMERIC AS employee_out_id,
        $6::JSONB AS employee_out_info,
        $7::NUMERIC AS tcpl_id,
        $8::NUMERIC AS company_id,
        $9::NUMERIC AS visitor_record_id,
        current_timestamp AS action_time
    )
    UPDATE t_visitor_record SET 
        img_visitor_out = (SELECT img_visitor_out FROM input_data)
        ,action_out_flag = 'Y'
        ,action_type = 'OUT'
        ,guardhouse_out_id = (SELECT guardhouse_out_id FROM input_data)
        ,guardhouse_out_code = (SELECT guardhouse_out_code FROM input_data)
        ,parking_out_datetime = (SELECT action_time FROM input_data)
        ,datetime_action = (SELECT action_time FROM input_data)
        ,pos_id = (SELECT pos_id FROM input_data)
        ,employee_out_id = (SELECT employee_out_id FROM input_data)
        ,employee_out_info = (SELECT employee_out_info FROM input_data)
        ,tcpl_id = (SELECT tcpl_id FROM input_data)
        WHERE company_id = (SELECT company_id FROM input_data)
        AND visitor_record_id = (SELECT visitor_record_id FROM input_data)
        AND action_out_flag = 'N'
    RETURNING visitor_record_id
    ;`;

    const query1 = {
      text: sql1,
      values: [
        img_visitor_out,
        guardhouse_out_id,
        guardhouse_out_code,
        pos_id,
        employee_out_id,
        employee_out_info,
        tcpl_id,
        company_id,
        visitor_record_id,
      ],
    };
    const querys = [query1];
    const res = await this.dbconnecttion.savePgData(querys);
    console.log(querys);
    if (res.error)
      throw new StatusException(
        {
          error: res.error,
          result: recordIn,
          message: this.errMessageUtilsTh.messageProcessFail,
          statusCode: 200,
        },
        200,
      );
    else
      throw new StatusException(
        {
          error: null,
          result: recordIn,
          message: this.errMessageUtilsTh.messageSuccess,
          statusCode: 200,
        },
        200,
      );
  }

  async getRecordInWithLPR(@Body() body) {
    const company_id = body.company_id;
    const license_plate = body.license_plate;
    const promotion_code = body.promotion_code ? body.promotion_code : '';
    let sql1 = `
    with input_data AS (
		SELECT
		$1::NUMERIC AS company_id,
		$2::VARCHAR AS license_plate
)
        SELECT  
        	visitor_record_id,visitor_record_code,ref_visitor_record_id
			,CASE WHEN tvr.tbv_code IS NOT NULL THEN 'BOOKING'
			ELSE 'VISITOR' END AS action_in_type
			,visitor_slot_id,visitor_slot_number
			,card_id,card_code,card_name
        	,tvr.tbv_code
        	,cartype_id,cartype_name_th,cartype_name_en
        	,cartype_category_id,cartype_category_info
        	,visitor_info,action_info
        	,tvr.home_id,home_info
        	,guardhouse_in_id,guardhouse_in_code
        	,employee_in_id,employee_in_info
        	,license_plate
        	,tb.tbv_license_plate
        	,tb.tbv_contact_person
        	,tb.tbv_mobile_contact_person
        	,img_visitor_in
        	,tvr.estamp_id
        	,tvr.estamp_datetime
        	,tvr.estamp_image
        	,tvr.estamp_flag
        	,tvr.parking_in_datetime
        	,tvr.datetime_action
        	,current_timestamp as date_now
            ,tvr.company_id
        FROM t_visitor_record tvr
        LEFT JOIN t_booking_visitor tb ON tvr.tbv_code = tb.tbv_code
        WHERE tvr.action_out_flag = 'N'
        AND tvr.company_id = (SELECT company_id FROM input_data)
        AND tvr.license_plate = (SELECT license_plate FROM input_data)
    `;
    const query1 = {
      text: sql1,
      values: [company_id, license_plate],
    };
    const res = await this.dbconnecttion.getPgData(query1);
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
          error: this.errMessageUtilsTh.errLicenseplateNotIn,
          result: null,
          message: this.errMessageUtilsTh.errLicenseplateNotIn,
          statusCode: 200,
        },
        200,
      );
      else if (res.result.length > 1)
      throw new StatusException(
        {
          error: this.errMessageUtilsTh.errLicenseplateInThanMoreOneRecord,
          result: null,
          message: this.errMessageUtilsTh.errLicenseplateInThanMoreOneRecord,
          statusCode: 200,
        },
        200,
      );
      
    else {
      //-------------------------Get Calculate
      const resultReUse = res.result[0];
      const estamp_flag = resultReUse.estamp_flag;
      const getcal = await this.localSettingUtils.getVisitorCalculateMode(company_id);
      if (getcal) {
        //-----------------------Calculate parking
        const calculateParkingInfo = await this.getCalculate({
          ...resultReUse,
          company_id,
          promotion_code,
          estamp_flag,
        }).then((response) => {
          return response.data;
        });

        if (calculateParkingInfo.response.error)
          throw new StatusException(
            {
              error: calculateParkingInfo.response.error,
              result: null,
              message: calculateParkingInfo.response.message,
              statusCode: 200,
            },
            200,
          );
            const res = {
                ...resultReUse
                ,...calculateParkingInfo.response.result
            }
         return res
      } else {
        return resultReUse;
      }
    }
  }

  async getCalculate(valuesObj: any): Promise<AxiosResponse> {
    const company_id = valuesObj.company_id;
    const visitor_record_id = valuesObj.visitor_record_id;
    const start_date = moment(valuesObj.parking_in_datetime).format(
      'YYYY-MM-DD HH:mm:ss',
    );
    const end_date = moment(valuesObj.date_now).format('YYYY-MM-DD HH:mm:ss');
    const cartype_id = valuesObj.cartype_id;
    const promotion_code = valuesObj.promotion_code.toUpperCase();
    const estamp_flag = valuesObj.estamp_flag;
    const params = {
      company_id,
      visitor_record_id,
      start_date,
      end_date,
      cartype_id,
      promotion_code,
      estamp_flag,
    };
    return this.httpService
      .post(configfile.URL_CALCULATE, params)
      .toPromise()
      .catch((err) => {
        console.log(`เชื่อมต่อ api ${configfile.URL_CALCULATE} ล้มเหลว`);
        throw new StatusException(
          {
            error: this.errMessageUtilsTh.errConnectServerCalculateError,
            result: null,
            message: this.errMessageUtilsTh.errConnectServerCalculateError,
            statusCode: 200,
          },
          200,
        );
      });
  }
}
