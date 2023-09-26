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
exports.EstampSaveVisitorMiddleware = void 0;
const common_1 = require("@nestjs/common");
const err_message_th_utils_1 = require("../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../utils/format_data.utils");
const callback_status_1 = require("../../utils/callback.status");
const pg_database_1 = require("../../pg_database/pg.database");
let EstampSaveVisitorMiddleware = class EstampSaveVisitorMiddleware {
    constructor(errMessageUrilTh, formatDataUtils, dbconnecttion) {
        this.errMessageUrilTh = errMessageUrilTh;
        this.formatDataUtils = formatDataUtils;
        this.dbconnecttion = dbconnecttion;
    }
    async intercept(context, next) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        console.log(request.files);
        const errMessage = await this.checkInputValues(request);
        if (errMessage)
            throw new callback_status_1.StatusException({
                error: errMessage,
                result: null,
                message: this.errMessageUrilTh.messageProcessFail,
                statusCode: 200
            }, 200);
        else
            return next.handle();
    }
    async checkInputValues(request) {
        const body = request.body;
        const file = request.files;
        if (!file.image_customer)
            return this.errMessageUrilTh.errImageCustomerNotFound;
        else if (!body.visitor_record_id)
            return this.errMessageUrilTh.errVisitorRecordIDNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.visitor_record_id))
            return this.errMessageUrilTh.errVisitorRecordIdProhibitSpecial;
        else if (!this.formatDataUtils.IsNumber(body.visitor_record_id))
            return this.errMessageUrilTh.errVisitorRecordIdNotNumber;
        else if (!body.employee_id)
            return this.errMessageUrilTh.errEmployeeIDNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.employee_id))
            return this.errMessageUrilTh.errEmployeeIDProhibitSpecail;
        else if (!this.formatDataUtils.IsNumber(body.employee_id))
            return this.errMessageUrilTh.errEmployeeIDNotNumber;
        else if (!body.guardhouse_id)
            return this.errMessageUrilTh.errGuardHouseIDNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.guardhouse_id))
            return this.errMessageUrilTh.errGuardHouseIDProhibitSpecial;
        else if (!this.formatDataUtils.IsNumber(body.guardhouse_id))
            return this.errMessageUrilTh.errGuardHouseIDNotNumber;
        else if (!body.estamp_id)
            return this.errMessageUrilTh.errEstampIDNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.estamp_id))
            return this.errMessageUrilTh.errEstampIDProhibitSpecial;
        else if (!this.formatDataUtils.IsNumber(body.estamp_id))
            return this.errMessageUrilTh.errEstampIDNotNumber;
        const checkVisitorIn = await this.checkVisitorRecord(body);
        if (checkVisitorIn)
            return checkVisitorIn;
        const checkEmployee = await this.checkEmployee(body);
        if (checkEmployee)
            return checkEmployee;
        const checkEstamp = await this.checkEstamp(body);
        return checkEstamp;
    }
    async checkVisitorRecord(body) {
        const visitor_record_id = body.visitor_record_id;
        const company_id = body.company_id;
        let sql = `select visitor_record_id from t_visitor_record
        where visitor_record_id = $1 and company_id = $2 and action_out_flag = 'N';`;
        const query = {
            text: sql,
            values: [visitor_record_id, company_id]
        };
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error)
            return res.error;
        else if (res.result.length === 0)
            return this.errMessageUrilTh.errVisitorNotIn;
        else
            return null;
    }
    async checkEmployee(body) {
        const employee_id = body.employee_id;
        const company_id = body.company_id;
        let sql = `select employee_id from m_employee where delete_flag = 'N' and employee_id = $1 and company_id = $2;`;
        const query = {
            text: sql,
            values: [employee_id, company_id]
        };
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error)
            return res.error;
        else if (res.result.length === 0)
            return this.errMessageUrilTh.errEmployeeIDNotInDatabase;
        else
            return null;
    }
    async checkEstamp(body) {
        const estamp_id = body.estamp_id;
        const company_id = body.company_id;
        let sql = `select estamp_id from m_estamp where delete_flag = 'N' and estamp_id = $1 and company_id = $2;`;
        const query = {
            text: sql,
            values: [estamp_id, company_id]
        };
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error)
            return res.error;
        else if (res.result.length === 0)
            return this.errMessageUrilTh.errEstampNotInBase;
        else
            return null;
    }
};
EstampSaveVisitorMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [err_message_th_utils_1.ErrMessageUtilsTH,
        format_data_utils_1.FormatDataUtils,
        pg_database_1.dbConnection])
], EstampSaveVisitorMiddleware);
exports.EstampSaveVisitorMiddleware = EstampSaveVisitorMiddleware;
//# sourceMappingURL=EstampSaveVisitor.middleware.js.map