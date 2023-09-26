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
exports.VisitorPendantService = void 0;
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../../../pg_database/pg.database");
const callback_status_1 = require("../../../utils/callback.status");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
let VisitorPendantService = class VisitorPendantService {
    constructor(dbconnecttion, errMessageUtilsTh) {
        this.dbconnecttion = dbconnecttion;
        this.errMessageUtilsTh = errMessageUtilsTh;
    }
    async getVisitorPendantAll(body) {
        return this.getVisitorPendantAllFromDatabase(body);
    }
    async getVisitorPendantAllFromDatabase(body) {
        const company_id = body.company_id;
        const identity_card = body.identity_card ? body.identity_card : '';
        const license_plate = body.license_plate ? body.license_plate : '';
        let sql = `select 
        visitor_record_id,visitor_record_code
        ,visitor_slot_id,visitor_slot_number
        ,card_id,card_code,card_name
         ,cartype_id,cartype_name_th,cartype_name_en
         ,cartype_category_id,cartype_category_info
         ,visitor_info,action_info
         ,home_id,home_info
         ,license_plate
         ,img_visitor_in
         ,parking_in_datetime
         ,datetime_action
         ,guardhouse_in_id,guardhouse_in_code
         ,estamp_flag,estamp_datetime
         ,employee_in_id,employee_in_info
         from t_visitor_record
         where action_out_flag = 'N'
         and tbv_code is null
         and company_id = $1`;
        if (identity_card)
            sql += ` and visitor_info->>'identity_card' = '${identity_card}'`;
        if (license_plate)
            sql += ` and license_plate LIKE '%${license_plate}%'`;
        sql += ` order by parking_in_datetime;`;
        const query = {
            text: sql,
            values: [company_id]
        };
        const res = await this.dbconnecttion.getPgData(query);
        console.log(res.result);
        if (res.error)
            throw new callback_status_1.StatusException({
                error: res.error,
                result: null,
                message: this.errMessageUtilsTh.messageProcessFail,
                statusCode: 200
            }, 200);
        else if (res.result.length === 0)
            throw new callback_status_1.StatusException({
                error: this.errMessageUtilsTh.errVisitorPendantNotInBase,
                result: null,
                message: this.errMessageUtilsTh.errVisitorPendantNotInBase,
                statusCode: 200
            }, 200);
        else
            throw new callback_status_1.StatusException({
                error: null,
                result: { data: res.result, value_count: res.result.length },
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
], VisitorPendantService.prototype, "getVisitorPendantAll", null);
__decorate([
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VisitorPendantService.prototype, "getVisitorPendantAllFromDatabase", null);
VisitorPendantService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [pg_database_1.dbConnection,
        err_message_th_utils_1.ErrMessageUtilsTH])
], VisitorPendantService);
exports.VisitorPendantService = VisitorPendantService;
//# sourceMappingURL=visitor-pendant.service.js.map