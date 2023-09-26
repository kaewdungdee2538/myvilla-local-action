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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetVisitorService = void 0;
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../../../pg_database/pg.database");
const callback_status_1 = require("../../../utils/callback.status");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
let ResetVisitorService = class ResetVisitorService {
    constructor(dbconnecttion, errMessageUtilsTh) {
        this.dbconnecttion = dbconnecttion;
        this.errMessageUtilsTh = errMessageUtilsTh;
    }
    async resetVisitorData() {
        let sql = `delete from t_visitor_record;`;
        sql += `alter sequence seq_t_visitor_record restart with 1;`;
        sql += `update m_visitor_slot set visitor_record_id = null,visitor_record_code = null,status_flag = 'N';`;
        sql += `update m_card set visitor_record_id = null,visitor_record_code = null,status_flag = 'N',delete_flag = 'N',cardproblem_flag = 'N';`;
        const res = await this.dbconnecttion.savePgData([sql]);
        if (res.error)
            throw new callback_status_1.StatusException({
                error: res.error,
                result: null,
                message: this.errMessageUtilsTh.messageProcessFail,
                statusCode: 400
            }, 400);
        throw new callback_status_1.StatusException({
            error: null,
            result: this.errMessageUtilsTh.messageSuccess,
            message: this.errMessageUtilsTh.messageSuccess,
            statusCode: 400
        }, 400);
    }
};
ResetVisitorService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [pg_database_1.dbConnection,
        err_message_th_utils_1.ErrMessageUtilsTH])
], ResetVisitorService);
exports.ResetVisitorService = ResetVisitorService;
//# sourceMappingURL=reset-visitor.service.js.map