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
exports.GetSlotService = void 0;
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../../../pg_database/pg.database");
const callback_status_1 = require("../../../utils/callback.status");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
let GetSlotService = class GetSlotService {
    constructor(dbconnecttion, errMessageUtilsTh) {
        this.dbconnecttion = dbconnecttion;
        this.errMessageUtilsTh = errMessageUtilsTh;
    }
    async getSlotNotUse(body) {
        console.log({ body });
        const building_id = body.company_id;
        const guardhouse_id = body.guardhouse_id;
        let sql = `select min(visitor_slot_number) as visitor_slot_number,min(visitor_slot_id) as visitor_slot_id from m_visitor_slot where status_flag ='N'`;
        sql += ` and company_id = $1`;
        const querys = {
            text: sql,
            values: [building_id]
        };
        const result = await this.dbconnecttion.getPgData(querys);
        console.log(result);
        return this.returnService(result);
    }
    async getSlotNotUseAll(body) {
        console.log({ body });
        const building_id = body.company_id;
        const guardhouse_id = body.guardhouse_id;
        let sql = `select visitor_slot_number::integer,visitor_slot_id::integer from m_visitor_slot where status_flag ='N'`;
        sql += ` and company_id = $1  order by visitor_slot_number`;
        const querys = {
            text: sql,
            values: [building_id]
        };
        const res = await this.dbconnecttion.getPgData(querys);
        console.log(res);
        if (await res.error) {
            throw new callback_status_1.StatusException({
                error: res.error,
                result: null,
                message: this.errMessageUtilsTh.errGetSlotVisitorNumberIsFail,
                statusCode: 200
            }, 200);
        }
        else if (res.result[0].visitor_slot_number) {
            throw new callback_status_1.StatusException({
                error: null,
                result: res.result,
                message: this.errMessageUtilsTh.messageSuccess,
                statusCode: 200
            }, 200);
        }
        else {
            throw new callback_status_1.StatusException({
                error: this.errMessageUtilsTh.errGetSlotVistiorNumberNotValue,
                result: null,
                message: this.errMessageUtilsTh.errGetSlotVistiorNumberNotValue,
                statusCode: 200
            }, 200);
        }
    }
    async getSlotNotUseById(body) {
        console.log({ body });
        const building_id = body.company_id;
        const guardhouse_id = body.guardhouse_id;
        const visitor_slot_number = body.visitor_slot_number;
        let sql = `select min(visitor_slot_number) as visitor_slot_number,min(visitor_slot_id) as visitor_slot_id from m_visitor_slot where status_flag ='N'`;
        sql += ` and company_id = $1 and visitor_slot_number = $3`;
        const querys = {
            text: sql,
            values: [building_id, visitor_slot_number]
        };
        const result = await this.dbconnecttion.getPgData(querys);
        console.log(result);
        return this.returnService(result);
    }
    async returnService(result) {
        if (await result.error) {
            throw new callback_status_1.StatusException({
                error: result.error,
                result: null,
                message: this.errMessageUtilsTh.errGetSlotVisitorNumberIsFail,
                statusCode: 200
            }, 200);
        }
        else if (result.result[0].visitor_slot_number) {
            throw new callback_status_1.StatusException({
                error: null,
                result: {
                    visitor_slot_number: parseInt(result.result[0].visitor_slot_number),
                    visitor_slot_id: parseInt(result.result[0].visitor_slot_id)
                },
                message: this.errMessageUtilsTh.messageSuccess,
                statusCode: 200
            }, 200);
        }
        else {
            throw new callback_status_1.StatusException({
                error: this.errMessageUtilsTh.errGetSlotVistiorNumberNotValue,
                result: null,
                message: this.errMessageUtilsTh.errGetSlotVistiorNumberNotValue,
                statusCode: 200
            }, 200);
        }
    }
};
__decorate([
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GetSlotService.prototype, "getSlotNotUse", null);
__decorate([
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GetSlotService.prototype, "getSlotNotUseAll", null);
__decorate([
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GetSlotService.prototype, "getSlotNotUseById", null);
GetSlotService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [pg_database_1.dbConnection,
        err_message_th_utils_1.ErrMessageUtilsTH])
], GetSlotService);
exports.GetSlotService = GetSlotService;
//# sourceMappingURL=get-slot.service.js.map