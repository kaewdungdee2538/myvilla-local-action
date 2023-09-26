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
exports.LPRBCheckInService = void 0;
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../../../pg_database/pg.database");
const callback_status_1 = require("../../../utils/callback.status");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
let LPRBCheckInService = class LPRBCheckInService {
    constructor(dbconnecttion, errMessageUtilsTh) {
        this.dbconnecttion = dbconnecttion;
        this.errMessageUtilsTh = errMessageUtilsTh;
    }
    async getBookingWithLPR(body) {
        return this.getBookingInfoWithLPR(body);
    }
    async getBookingInfoWithLPR(body) {
        const company_id = body.company_id;
        const license_plate = body.license_plate;
        let sql = `select 
        tbv.tbv_id,tbv.tbv_code
        ,tbv.home_line_id
        ,mhl.home_id,mh.home_code,mh.home_name,mh.home_address,mh.home_type
        ,mh.home_data,mh.home_remark
        ,mh.home_privilege_line_amount,mh.home_privilege_card_amount
        ,tbv.tbv_start_datetime as booking_start_datetime
        ,tbv.tbv_end_datetime as booking_end_datetime
        ,tbv.tbv_license_plate as license_plate
        ,tbv.tbv_contact_person as person_name
        ,tbv.tbv_mobile_contact_person as person_mobile
        ,tbv.tbv_detail,tbv.tbv_data 
        ,case when tbv.tbv_status = 'Y' then true else false end as action_out_status
        ,mhl.home_line_first_name as host_first_name
        ,mhl.home_line_last_name as host_last_name
        ,mhl.home_line_mobile_phone as host_mobile
        ,tbv.create_by,tbv.create_date
        from t_booking_visitor tbv
        inner join m_home_line mhl on tbv.home_line_id = mhl.home_line_id
        left join m_home mh on mhl.home_id = mh.home_id
        where tbv.delete_flag = 'N'
        and current_timestamp < tbv_end_datetime
        and tbv.company_id = $1
        and tbv_license_plate = $2
        order by tbv_end_datetime desc 
        limit 1
        ;`;
        const query = {
            text: sql,
            values: [company_id, license_plate]
        };
        const res = await this.dbconnecttion.getPgData(query);
        console.log(res.result[0]);
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
        else if (res.result[0].action_out_status)
            throw new callback_status_1.StatusException({
                error: this.errMessageUtilsTh.errBookingIsUse,
                result: null,
                message: this.errMessageUtilsTh.errBookingIsUse,
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
], LPRBCheckInService.prototype, "getBookingWithLPR", null);
__decorate([
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LPRBCheckInService.prototype, "getBookingInfoWithLPR", null);
LPRBCheckInService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [pg_database_1.dbConnection,
        err_message_th_utils_1.ErrMessageUtilsTH])
], LPRBCheckInService);
exports.LPRBCheckInService = LPRBCheckInService;
//# sourceMappingURL=b-check-in.service.js.map