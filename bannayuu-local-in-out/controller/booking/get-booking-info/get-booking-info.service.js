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
exports.GetBookingInfoService = void 0;
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../../../pg_database/pg.database");
const callback_status_1 = require("../../../utils/callback.status");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
let GetBookingInfoService = class GetBookingInfoService {
    constructor(dbconnecttion, errMessageUtilsTh) {
        this.dbconnecttion = dbconnecttion;
        this.errMessageUtilsTh = errMessageUtilsTh;
    }
    async getBookingInfo(body) {
        return this.getBooking(body);
    }
    async getBooking(body) {
        const company_id = body.company_id;
        const tbv_code = body.tbv_code;
        let sql = `select 
        tb.tbv_code
        ,tb.home_line_id
        ,mhl.home_id,mh.home_code,mh.home_name,mh.home_address,mh.home_type
        ,mh.home_data,mh.home_remark
        ,mh.home_privilege_line_amount,mh.home_privilege_card_amount
        ,tb.tbv_start_datetime
        ,tb.tbv_end_datetime
        ,tb.tbv_license_plate
        ,tb.tbv_contact_person
        ,tb.tbv_mobile_contact_person
        ,tb.tbv_detail,tb.tbv_data
        ,tb.create_by,tb.create_date
        from t_booking_visitor tb
        inner join m_home_line mhl on tb.home_line_id = mhl.home_line_id
        left join m_home mh on mhl.home_id = mh.home_id
        where tb.delete_flag = 'N'
        and tb.tbv_status = 'N'
        and current_timestamp <= tb.tbv_end_datetime
        and tb.company_id = $1
        and tb.tbv_code = $2
        limit 1
        ;`;
        const query = {
            text: sql,
            values: [company_id, tbv_code]
        };
        const res = await this.dbconnecttion.getPgData(query);
        if (await res.error)
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
        else
            throw new callback_status_1.StatusException({
                error: null,
                result: res.result[0],
                message: this.errMessageUtilsTh.messageSuccess,
                statusCode: 200
            }, 200);
    }
};
__decorate([
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GetBookingInfoService.prototype, "getBookingInfo", null);
__decorate([
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GetBookingInfoService.prototype, "getBooking", null);
GetBookingInfoService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [pg_database_1.dbConnection,
        err_message_th_utils_1.ErrMessageUtilsTH])
], GetBookingInfoService);
exports.GetBookingInfoService = GetBookingInfoService;
//# sourceMappingURL=get-booking-info.service.js.map