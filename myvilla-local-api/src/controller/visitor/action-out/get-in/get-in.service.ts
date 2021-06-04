import { Body, HttpException, HttpService, Injectable } from '@nestjs/common';
import { RegistryImageService } from 'src/controller/image/registry-image/registry-image.service';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { LoadSettingLocalUtils } from 'src/utils/load_setting_local.utils'
import { AxiosResponse } from "axios";
import * as  moment from 'moment';
import { configfile } from '../../../../conf/config-setting'
import { CalTimediffService } from 'src/controller/cal-timediff/cal-timediff.service';
@Injectable()
export class GetInService {
    constructor(
        private readonly dbconnecttion: dbConnection
        , private readonly errMessageUtilsTh: ErrMessageUtilsTH
        , private readonly registryImageService: RegistryImageService
        , private readonly localSettingUtils: LoadSettingLocalUtils
        , private httpService: HttpService
        , private readonly calTimediffService: CalTimediffService
    ) { }
    async getActionInInfo(@Body() body, req: any) {
        const visitor_record_code = await this.getVSRecordID(body);
        if (await visitor_record_code.error)
            throw new StatusException(
                {
                    error: visitor_record_code.error
                    , result: null
                    , message: this.errMessageUtilsTh.messageProcessFail
                    , statusCode: 200
                }
                , 200
            )
        else if (visitor_record_code.result[0].visitor_record_code) {
            const visitorInfo = {
                visitor_record_code: visitor_record_code.result[0].visitor_record_code
                , company_id: body.company_id
                , promotion_code: body.promotion_code
            }
            return await this.getDataInInfo(visitorInfo, req);
        }
        else
            throw new StatusException(
                {
                    error: this.errMessageUtilsTh.errGetDataActionInInfoNotFound
                    , result: null
                    , message: this.errMessageUtilsTh.errGetDataActionInInfoNotFound
                    , statusCode: 200
                }
                , 200
            )
    }
    async getVSRecordID(@Body() body) {
        const company_id = body.company_id;
        const card_code = body.card_code;
        const card_name = body.card_name;
        const visitor_slot_number = !body.visitor_slot_number ? 0 : body.visitor_slot_number;
        let sql = `select func_getvs_uuid_card_or_slot($1,$2,$3,$4) as visitor_record_code;`

        console.log(sql)
        const query = {
            text: sql
            , values: [
                company_id
                , card_code
                , card_name
                , visitor_slot_number
            ]
        }
        const res = await this.dbconnecttion.getPgData(query);
        return res;
    }
    async getDataInInfo(visitorInfo: any, req: any) {
        const employeeObj = req.user.employee;
        const employee_id = employeeObj.employee_id;
        const company_id = visitorInfo.company_id;
        const visitor_record_code = visitorInfo.visitor_record_code;
        const promotion_code = visitorInfo.promotion_code ? visitorInfo.promotion_code : "";
        let sql = `select visitor_record_id,visitor_record_code,visitor_slot_id,visitor_slot_number,card_code,card_name
        ,cartype_id,cartype_name_th,cartype_name_en,visitor_info,action_info
        ,home_id,home_info,license_plate
        ,img_visitor_in->'images' as image_path
        ,estamp_flag,estamp_id
        ,to_char(estamp_datetime,'YYYY-MM-DD HH24:MI:SS') as estamp_datetime
        ,coalesce(to_char(parking_payment_datetime,'YYYY-MM-DD HH24:MI:SS'),to_char(parking_in_datetime,'YYYY-MM-DD HH24:MI:SS')) as parking_in_datetime
        ,to_char(datetime_action,'YYYY-MM-DD HH24:MI:SS') as datetime_action
        ,to_char(current_timestamp,'YYYY-MM-DD HH24:MI:SS') as date_now
        ,employee_in_id,employee_in_info
         from t_visitor_record
         where action_out_flag = 'N'
         and company_id = $1
         and visitor_record_code = $2;`

        console.log(sql);
        const query = {
            text: sql
            , values: [
                company_id
                , visitor_record_code
            ]
        }
        const res = await this.dbconnecttion.getPgData(query);
        console.log(res);
        if (res.error)
            throw new StatusException({
                error: res.error
                , result: null
                , message: this.errMessageUtilsTh.messageProcessFail
                , statusCode: 200
            }, 200)
        else if (res.result.length === 0)
            throw new StatusException({
                error: this.errMessageUtilsTh.errGetDataActionInInfoNotFound
                , result: null
                , message: this.errMessageUtilsTh.errGetDataActionInInfoNotFound
                , statusCode: 200
            }, 200)
        else {
            //-------------------------Get Calculate
            const resultReUse = res.result[0];
            const estamp_flag = resultReUse.estamp_flag
            const getcal = await this.localSettingUtils.getVisitorCalculateMode(company_id);
            //-------------------------have a calculate enable
            if (getcal) {
                //-----------------------Calculate parking
                const calculateParkingInfo = await this.getCalculate({
                    ...resultReUse,
                    company_id,
                    employee_id,
                    promotion_code,
                    estamp_flag
                })
                    .then(response => {
                        return response.data;
                    });
                if (calculateParkingInfo.response.error)
                    throw new StatusException({
                        error: calculateParkingInfo.response.error
                        , result: null
                        , message: calculateParkingInfo.response.message
                        , statusCode: 200
                    }, 200)
                throw new StatusException({
                    error: null
                    , result: {
                        ...resultReUse
                        , calculate_info: calculateParkingInfo ? calculateParkingInfo.response.result.summary_data : null
                    }
                    , message: this.errMessageUtilsTh.messageSuccess
                    , statusCode: 200
                }, 200)
            } else {
                const sum_interval = await this.calTimediffService.calTimeDiffFormDateStartToDateEnd(resultReUse.parking_in_datetime,resultReUse.date_now);
                const sum_interval_text = this.calTimediffService.convertTimeDiffToText(sum_interval);
                throw new StatusException({
                    error: null
                    , result: {
                        ...resultReUse
                        , calculate_info: {
                            tcpl_id:null,
                            cartype_id: resultReUse.cartype_id,
                            start_date: resultReUse.parking_in_datetime,
                            end_date: resultReUse.date_now,
                            sum_interval: sum_interval,
                            sum_interval_text: sum_interval_text,
                            sum_interval_after_discount_minute: "",
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
                            promotion_object: null
                        }
                    }
                    , message: this.errMessageUtilsTh.messageSuccess
                    , statusCode: 200
                }, 200)
            }
        }
    }
    async getCalculate(valuesObj: any): Promise<AxiosResponse> {
        const company_id = valuesObj.company_id;
        const visitor_record_id = valuesObj.visitor_record_id;
        const employee_id = valuesObj.employee_id;
        const start_date = moment(valuesObj.parking_in_datetime).format("YYYY-MM-DD HH:mm:ss");
        const end_date = moment(valuesObj.date_now).format("YYYY-MM-DD HH:mm:ss");
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
            estamp_flag
        }
        return this.httpService.post(
            configfile.URL_CALCULATE
            , params
        ).toPromise()
            .catch(err => {
                console.log(`เชื่อมต่อ api ${configfile.URL_CALCULATE} ล้มเหลว`);
                throw new StatusException({
                    error: this.errMessageUtilsTh.errConnectServerCalculateError
                    , result: null
                    , message: this.errMessageUtilsTh.errConnectServerCalculateError
                    , statusCode: 200
                }, 200)
            });
    }



}
