"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInService = void 0;
const common_1 = require("@nestjs/common");
const registry_image_service_1 = require("../../../image/registry-image/registry-image.service");
const pg_database_1 = require("../../../../pg_database/pg.database");
const callback_status_1 = require("../../../../utils/callback.status");
const err_message_th_utils_1 = require("../../../../utils/err_message_th.utils");
const load_setting_local_utils_1 = require("../../../../utils/load_setting_local.utils");
const moment = require("moment");
const config_setting_1 = require("../../../../conf/config-setting");
const cal_timediff_service_1 = require("../../../cal-timediff/cal-timediff.service");
let GetInService = class GetInService {
    constructor(dbconnecttion, errMessageUtilsTh, registryImageService, localSettingUtils, httpService, calTimediffService) {
        this.dbconnecttion = dbconnecttion;
        this.errMessageUtilsTh = errMessageUtilsTh;
        this.registryImageService = registryImageService;
        this.localSettingUtils = localSettingUtils;
        this.httpService = httpService;
        this.calTimediffService = calTimediffService;
    }
    async getActionInInfo(body, req) {
        const visitor_record_code = await this.getVSRecordID(body);
        if (await visitor_record_code.error)
            throw new callback_status_1.StatusException({
                error: visitor_record_code.error,
                result: null,
                message: this.errMessageUtilsTh.messageProcessFail,
                statusCode: 200
            }, 200);
        else if (visitor_record_code.result[0].visitor_record_code) {
            const visitorInfo = {
                visitor_record_code: visitor_record_code.result[0].visitor_record_code,
                company_id: body.company_id,
                promotion_code: body.promotion_code
            };
            return await this.getDataInInfo(visitorInfo, req);
        }
        else
            throw new callback_status_1.StatusException({
                error: this.errMessageUtilsTh.errGetDataActionInInfoNotFound,
                result: null,
                message: this.errMessageUtilsTh.errGetDataActionInInfoNotFound,
                statusCode: 200
            }, 200);
    }
    async getVSRecordID(body) {
        const company_id = body.company_id;
        const card_code = body.card_code;
        const card_name = body.card_name;
        const visitor_slot_number = !body.visitor_slot_number ? 0 : body.visitor_slot_number;
        let sql = `select func_getvs_uuid_card_or_slot($1,$2,$3,$4) as visitor_record_code;`;
        console.log(sql);
        const query = {
            text: sql,
            values: [
                company_id,
                card_code,
                card_name,
                visitor_slot_number
            ]
        };
        const res = await this.dbconnecttion.getPgData(query);
        return res;
    }
    async getDataInInfo(visitorInfo, req) {
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
         and visitor_record_code = $2;`;
        console.log(sql);
        const query = {
            text: sql,
            values: [
                company_id,
                visitor_record_code
            ]
        };
        const res = await this.dbconnecttion.getPgData(query);
        console.log(res);
        if (res.error)
            throw new callback_status_1.StatusException({
                error: res.error,
                result: null,
                message: this.errMessageUtilsTh.messageProcessFail,
                statusCode: 200
            }, 200);
        else if (res.result.length === 0)
            throw new callback_status_1.StatusException({
                error: this.errMessageUtilsTh.errGetDataActionInInfoNotFound,
                result: null,
                message: this.errMessageUtilsTh.errGetDataActionInInfoNotFound,
                statusCode: 200
            }, 200);
        else {
            const resultReUse = res.result[0];
            const estamp_flag = resultReUse.estamp_flag;
            const getcal = await this.localSettingUtils.getVisitorCalculateMode(company_id);
            if (getcal) {
                const calculateParkingInfo = await this.getCalculate(Object.assign(Object.assign({}, resultReUse), { company_id,
                    employee_id,
                    promotion_code,
                    estamp_flag }))
                    .then(response => {
                    return response.data;
                });
                if (calculateParkingInfo.response.error)
                    throw new callback_status_1.StatusException({
                        error: calculateParkingInfo.response.error,
                        result: null,
                        message: calculateParkingInfo.response.message,
                        statusCode: 200
                    }, 200);
                throw new callback_status_1.StatusException({
                    error: null,
                    result: Object.assign(Object.assign({}, resultReUse), { calculate_info: calculateParkingInfo ? calculateParkingInfo.response.result.summary_data : null }),
                    message: this.errMessageUtilsTh.messageSuccess,
                    statusCode: 200
                }, 200);
            }
            else {
                const sum_interval = await this.calTimediffService.calTimeDiffFormDateStartToDateEnd(resultReUse.parking_in_datetime, resultReUse.date_now);
                const sum_interval_text = this.calTimediffService.convertTimeDiffToText(sum_interval);
                throw new callback_status_1.StatusException({
                    error: null,
                    result: Object.assign(Object.assign({}, resultReUse), { calculate_info: {
                            tcpl_id: 0,
                            cartype_id: resultReUse.cartype_id,
                            start_date: resultReUse.parking_in_datetime,
                            end_date: resultReUse.date_now,
                            sum_interval: sum_interval,
                            sum_interval_text: sum_interval_text,
                            sum_interval_after_discount_minute_text: "",
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
                        } }),
                    message: this.errMessageUtilsTh.messageSuccess,
                    statusCode: 200
                }, 200);
            }
        }
    }
    async getCalculate(valuesObj) {
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
        };
        return this.httpService.post(config_setting_1.configfile.URL_CALCULATE, params).toPromise()
            .catch(err => {
            console.log(`เชื่อมต่อ api ${config_setting_1.configfile.URL_CALCULATE} ล้มเหลว`);
            throw new callback_status_1.StatusException({
                error: this.errMessageUtilsTh.errConnectServerCalculateError,
                result: null,
                message: this.errMessageUtilsTh.errConnectServerCalculateError,
                statusCode: 200
            }, 200);
        });
    }
};
__decorate([
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GetInService.prototype, "getActionInInfo", null);
__decorate([
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GetInService.prototype, "getVSRecordID", null);
GetInService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [pg_database_1.dbConnection,
        err_message_th_utils_1.ErrMessageUtilsTH,
        registry_image_service_1.RegistryImageService,
        load_setting_local_utils_1.LoadSettingLocalUtils,
        common_1.HttpService,
        cal_timediff_service_1.CalTimediffService])
], GetInService);
exports.GetInService = GetInService;
//# sourceMappingURL=get-in.service.js.map