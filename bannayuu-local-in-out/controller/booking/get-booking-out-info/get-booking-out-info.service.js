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
exports.GetBookingOutInfoService = void 0;
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../../../pg_database/pg.database");
const callback_status_1 = require("../../../utils/callback.status");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
const load_setting_local_utils_1 = require("../../../utils/load_setting_local.utils");
const config_setting_1 = require("../../../conf/config-setting");
const moment = require("moment");
const cal_timediff_service_1 = require("../../cal-timediff/cal-timediff.service");
let GetBookingOutInfoService = class GetBookingOutInfoService {
    constructor(dbconnecttion, errMessageUtilsTh, localSettingUtils, httpService, calTimediffService) {
        this.dbconnecttion = dbconnecttion;
        this.errMessageUtilsTh = errMessageUtilsTh;
        this.localSettingUtils = localSettingUtils;
        this.httpService = httpService;
        this.calTimediffService = calTimediffService;
    }
    async getBookingOutInfo(body, req) {
        return this.getBookingInInfo(body, req);
    }
    async getBookingInInfo(body, req) {
        const employeeObj = req.user.employee;
        const employee_id = employeeObj.employee_id;
        const company_id = body.company_id;
        const tbv_code = body.tbv_code;
        const promotion_code = body.promotion_code ? body.promotion_code : "";
        let sql1 = `select  
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
        ,to_char(tvr.estamp_datetime,'YYYY-MM-DD HH24:MI:SS') as estamp_datetime
        ,tvr.estamp_image
        ,tvr.estamp_flag
        ,to_char(tvr.parking_in_datetime,'YYYY-MM-DD HH24:MI:SS') as parking_in_datetime
        ,to_char(tvr.datetime_action,'YYYY-MM-DD HH24:MI:SS') as datetime_action
        ,to_char(current_timestamp,'YYYY-MM-DD HH24:MI:SS') as date_now
        from t_visitor_record tvr
        left join t_booking_visitor tb on tvr.tbv_code = tb.tbv_code
        where tvr.action_out_flag = 'N'
        and tvr.company_id = $1
        and tvr.tbv_code = $2
        limit 1;`;
        const query1 = {
            text: sql1,
            values: [
                company_id,
                tbv_code
            ]
        };
        const res = await this.dbconnecttion.getPgData(query1);
        if (res.error)
            throw new callback_status_1.StatusException({
                error: res.error,
                result: null,
                message: this.errMessageUtilsTh.messageProcessFail,
                statusCode: 200
            }, 200);
        else if (res.result.length === 0)
            throw new callback_status_1.StatusException({
                error: this.errMessageUtilsTh.errBookingNotFound,
                result: null,
                message: this.errMessageUtilsTh.errBookingNotFound,
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
], GetBookingOutInfoService.prototype, "getBookingOutInfo", null);
__decorate([
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GetBookingOutInfoService.prototype, "getBookingInInfo", null);
GetBookingOutInfoService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [pg_database_1.dbConnection,
        err_message_th_utils_1.ErrMessageUtilsTH,
        load_setting_local_utils_1.LoadSettingLocalUtils,
        common_1.HttpService,
        cal_timediff_service_1.CalTimediffService])
], GetBookingOutInfoService);
exports.GetBookingOutInfoService = GetBookingOutInfoService;
//# sourceMappingURL=get-booking-out-info.service.js.map