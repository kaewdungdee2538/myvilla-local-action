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
exports.GetSlipService = void 0;
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../../../pg_database/pg.database");
const callback_status_1 = require("../../../utils/callback.status");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
let GetSlipService = class GetSlipService {
    constructor(dbconnecttion, errMessageUtilsTh) {
        this.dbconnecttion = dbconnecttion;
        this.errMessageUtilsTh = errMessageUtilsTh;
    }
    async getSlipInInfo(body) {
        return await this.getSlipInInfoFormBase(body);
    }
    async getSlipInInfoFormBase(body) {
        const visitor_record_code = body.visitor_record_code;
        const company_id = body.company_id;
        let sql = `select 
        visitor_record_id,visitor_record_code,ref_visitor_record_id,tbv_code
        ,visitor_slot_number,card_code,card_name
        ,cartype_name_th,cartype_name_en,cartype_category_info
        ,visitor_info,action_info
        ,home_info,guardhouse_in_code
        ,license_plate
        ,parking_in_datetime
        ,datetime_action
        from t_visitor_record
        where visitor_record_code = $1
        and company_id = $2
        and action_type ='IN'
        order by 1
        limit 1;
        `;
        const query = {
            text: sql,
            values: [visitor_record_code, company_id]
        };
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error)
            throw new callback_status_1.StatusException({
                error: res.error,
                result: null,
                message: this.errMessageUtilsTh.messageProcessFail,
                statusCode: 200
            }, 200);
        else if (res.result.length === 0)
            throw new callback_status_1.StatusException({
                error: this.errMessageUtilsTh.errSlipInGetNotRow,
                result: null,
                message: this.errMessageUtilsTh.errSlipInGetNotRow,
                statusCode: 200
            }, 200);
        throw new callback_status_1.StatusException({
            error: null,
            result: res.result[0],
            message: this.errMessageUtilsTh.messageSuccess,
            statusCode: 200
        }, 200);
    }
    async getSlipOutInfo(body) {
        return await this.getSlipOutInfoFormBase(body);
    }
    async getSlipOutInfoFormBase(body) {
        const visitor_record_id = body.visitor_record_id;
        const company_id = body.company_id;
        let sql = `select 
        CONCAT(cartype_name_contraction,mpt.payment_type_code,guardhouse_out_id,TO_CHAR(current_timestamp,'YY'),TO_CHAR(current_timestamp,'MM'),TO_CHAR(current_timestamp,'DD'),to_char(12, 'FM999909999')) AS receipt_no
        ,company_name
        ,pos_id
        ,guardhouse_in_code
        ,guardhouse_out_code
        ,visitor_record_id,visitor_record_code,ref_visitor_record_id,tbv_code
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
        ,discount_info
        ,parking_in_datetime
        ,parking_payment_datetime
        ,parking_out_datetime
        ,cardproblem_info
        ,case when cardproblem_flag = 'Y' then true else false end as cardproblem_status
        ,cardproblem_datetime
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
        `;
        const query = {
            text: sql,
            values: [visitor_record_id, company_id]
        };
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error)
            throw new callback_status_1.StatusException({
                error: res.error,
                result: null,
                message: this.errMessageUtilsTh.messageProcessFail,
                statusCode: 200
            }, 200);
        else if (res.result.length === 0)
            throw new callback_status_1.StatusException({
                error: this.errMessageUtilsTh.errSlipOutGetNotRow,
                result: null,
                message: this.errMessageUtilsTh.errSlipOutGetNotRow,
                statusCode: 200
            }, 200);
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
], GetSlipService.prototype, "getSlipInInfo", null);
__decorate([
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GetSlipService.prototype, "getSlipInInfoFormBase", null);
__decorate([
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GetSlipService.prototype, "getSlipOutInfo", null);
__decorate([
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GetSlipService.prototype, "getSlipOutInfoFormBase", null);
GetSlipService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [pg_database_1.dbConnection,
        err_message_th_utils_1.ErrMessageUtilsTH])
], GetSlipService);
exports.GetSlipService = GetSlipService;
//# sourceMappingURL=get-slip.service.js.map