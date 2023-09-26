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
exports.CheckCardService = void 0;
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../../../pg_database/pg.database");
const callback_status_1 = require("../../../utils/callback.status");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
let CheckCardService = class CheckCardService {
    constructor(dbconnecttion, errMessageUtilsTh) {
        this.dbconnecttion = dbconnecttion;
        this.errMessageUtilsTh = errMessageUtilsTh;
    }
    async checkCardVisitor(body) {
        return this.getCardVisitor(body);
    }
    async getCardVisitor(body) {
        const company_id = body.company_id;
        const card_code = !body.card_code ? '' : body.card_code;
        const card_name = !body.card_name ? '' : body.card_name;
        let sql = `select card_id,card_code,card_name,visitor_record_code`;
        sql += ` from m_card`;
        sql += ` where company_id = $1`;
        sql += ` and (card_code = $2 or card_name = $3) limit 1;`;
        const query = {
            text: sql,
            values: [company_id, card_code, card_name]
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
                error: this.errMessageUtilsTh.errGetCardNotInDatabase,
                result: null,
                message: this.errMessageUtilsTh.errGetCardNotInDatabase,
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
], CheckCardService.prototype, "checkCardVisitor", null);
__decorate([
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CheckCardService.prototype, "getCardVisitor", null);
CheckCardService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [pg_database_1.dbConnection,
        err_message_th_utils_1.ErrMessageUtilsTH])
], CheckCardService);
exports.CheckCardService = CheckCardService;
//# sourceMappingURL=check-card.service.js.map