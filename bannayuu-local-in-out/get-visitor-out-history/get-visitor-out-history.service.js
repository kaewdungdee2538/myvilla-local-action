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
exports.GetVisitorOutHistoryService = void 0;
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../pg_database/pg.database");
const callback_status_1 = require("../utils/callback.status");
const err_message_th_utils_1 = require("../utils/err_message_th.utils");
let GetVisitorOutHistoryService = class GetVisitorOutHistoryService {
    constructor(dbconnecttion, errMessageUtilsTh) {
        this.dbconnecttion = dbconnecttion;
        this.errMessageUtilsTh = errMessageUtilsTh;
    }
    async getVisitorOutHistory(body) {
        return await this.getVisitorOutHistoryFormBase(body);
    }
    async getVisitorOutHistoryFormBase(body) {
        const datetime_start = body.datetime_start;
        const datetime_end = body.datetime_end;
        const company_id = body.company_id;
        let sql = `select 
        visitor_record_id,visitor_record_code,ref_visitor_record_id,tbv_code
        ,visitor_slot_number,card_code,card_name
        ,cartype_name_th,cartype_name_en,cartype_category_info
        ,visitor_info,action_info
        ,home_info,guardhouse_in_code
        ,license_plate
        ,parking_in_datetime
        ,parking_out_datetime
        from t_visitor_record
        where parking_in_datetime between $1 and $2
        and company_id = $3
        and action_type ='OUT'
        order by parking_in_datetime;
        `;
        const query = {
            text: sql,
            values: [datetime_start, datetime_end, company_id]
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
            result: res.result,
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
], GetVisitorOutHistoryService.prototype, "getVisitorOutHistory", null);
__decorate([
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GetVisitorOutHistoryService.prototype, "getVisitorOutHistoryFormBase", null);
GetVisitorOutHistoryService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [pg_database_1.dbConnection,
        err_message_th_utils_1.ErrMessageUtilsTH])
], GetVisitorOutHistoryService);
exports.GetVisitorOutHistoryService = GetVisitorOutHistoryService;
//# sourceMappingURL=get-visitor-out-history.service.js.map