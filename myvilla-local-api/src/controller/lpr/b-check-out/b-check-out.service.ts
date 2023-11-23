import { Body, HttpService, Injectable } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { AxiosResponse } from 'axios';
import * as moment from 'moment';
import { configfile } from 'src/conf/config-setting';
import { CalTimediffService } from 'src/controller/cal-timediff/cal-timediff.service';
import { LoadSettingLocalUtils } from 'src/utils/load_setting_local.utils';

@Injectable()
export class LPRBCheckOutService {
  constructor(
    private readonly dbconnecttion: dbConnection,
    private readonly errMessageUtilsTh: ErrMessageUtilsTH,
    private httpService: HttpService,
    private readonly localSettingUtils: LoadSettingLocalUtils,
    private readonly calTimediffService: CalTimediffService,
  ) {}

  async getBookingOutWithLPR(@Body() body, req: any) {
    return await this.getBookingInfoWithLPR(body, req);
  }

  async getBookingInfoWithLPR(@Body() body, req: any) {
    const company_id = body.company_id;
    const license_plate = body.license_plate;
    const promotion_code = body.promotion_code ? body.promotion_code : '';
    let sql1 = `
        WITH input_data AS (
          SELECT
          $1::NUMERIC AS company_id,
          $2::VARCHAR AS license_plate
        )
        select  
        visitor_record_id,visitor_record_code,ref_visitor_record_id
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
        from t_visitor_record tvr
        left join t_booking_visitor tb on tvr.tbv_code = tb.tbv_code
        where tvr.action_out_flag = 'N'
        and tvr.company_id = (SELECT company_id FROM input_data)
        and tvr.license_plate = (SELECT license_plate FROM input_data)
        ORDER BY tvr.visitor_record_id DESC
        ;`;
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
          error: this.errMessageUtilsTh.errBookingNotFound,
          result: null,
          message: this.errMessageUtilsTh.errBookingNotFound,
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
      const getcal = await this.localSettingUtils.getVisitorCalculateMode(
        company_id,
      );
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
        throw new StatusException(
          {
            error: null,
            result: {
              ...resultReUse,
              calculate_info: calculateParkingInfo
                ? calculateParkingInfo.response.result.summary_data
                : null,
            },
            message: this.errMessageUtilsTh.messageSuccess,
            statusCode: 200,
          },
          200,
        );
      } else {
        const sum_interval = await this.calTimediffService.calTimeDiffFormDateStartToDateEnd(
          resultReUse.parking_in_datetime,
          resultReUse.date_now,
        );
        const sum_interval_text = this.calTimediffService.convertTimeDiffToText(
          sum_interval,
        );
        throw new StatusException(
          {
            error: null,
            result: {
              ...resultReUse,
              calculate_info: {
                cartype_id: resultReUse.cartype_id,
                start_date: resultReUse.parking_in_datetime,
                end_date: resultReUse.date_now,
                sum_interval: sum_interval,
                sum_interval_text: sum_interval_text,
                sum_interval_after_discount_minute: '',
                sum_interval_before_cal: 0,
                sum_interval_after_cal: 0,
                sum_parking_amount_before: 0,
                sum_parking_amount_after: 0,
                sum_parking_total: 0,
                minutes_discount: 0,
                parking_discount: 0,
                sum_parking_total_after_discount: 0,
                sum_overnight_fine_amount: 0,
                sum_total: 0,
                promotion_object: null,
              },
            },
            message: this.errMessageUtilsTh.messageSuccess,
            statusCode: 200,
          },
          200,
        );
      }
    }
  }

  async getCalculate(valuesObj: any): Promise<AxiosResponse> {
    console.log(valuesObj);
    const company_id = valuesObj.company_id;
    const visitor_record_id = valuesObj.visitor_record_id;
    const employee_id = valuesObj.employee_id;
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
      employee_id,
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
