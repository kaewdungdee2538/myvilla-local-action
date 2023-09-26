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
exports.HomeInterceptor = void 0;
const common_1 = require("@nestjs/common");
const err_message_th_utils_1 = require("../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../utils/format_data.utils");
const callback_status_1 = require("../../utils/callback.status");
const pg_database_1 = require("../../pg_database/pg.database");
let HomeInterceptor = class HomeInterceptor {
    constructor(errMessageUrilTh, formatDataUtils, dbconnection) {
        this.errMessageUrilTh = errMessageUrilTh;
        this.formatDataUtils = formatDataUtils;
        this.dbconnection = dbconnection;
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
                message: errMessage,
                statusCode: 200
            }, 200);
        else
            return next.handle();
    }
    async checkInputValues(request) {
        const body = request.body;
        const file = request.files;
        console.log(body);
        if (!body.home_id)
            return this.errMessageUrilTh.errHomeIDNotFound;
        else if (this.formatDataUtils.HaveSpecialHomeFormat(body.home_id))
            return this.errMessageUrilTh.errHomeIdProhibitSpecial;
        else if (!this.formatDataUtils.IsNumber(body.home_id))
            return this.errMessageUrilTh.errHomeIDNotNumber;
        return await this.CheckHomeInBase(body);
    }
    async CheckHomeInBase(body) {
        const company_id = body.company_id;
        const home_id = body.home_id;
        let sql = `select home_id from m_home where delete_flag = 'N' and company_id =$1 and home_id = $2;`;
        const query = {
            text: sql,
            values: [company_id, home_id]
        };
        const res = await this.dbconnection.getPgData(query);
        if (res.error)
            return res.error;
        else if (res.result.length === 0)
            return this.errMessageUrilTh.errHomeIDNotInDataBase;
        else
            return null;
    }
};
HomeInterceptor = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [err_message_th_utils_1.ErrMessageUtilsTH,
        format_data_utils_1.FormatDataUtils,
        pg_database_1.dbConnection])
], HomeInterceptor);
exports.HomeInterceptor = HomeInterceptor;
//# sourceMappingURL=home.interceptor.js.map