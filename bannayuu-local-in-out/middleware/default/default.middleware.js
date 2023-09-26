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
exports.vsDefaultMiddleware = void 0;
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../../pg_database/pg.database");
const err_message_th_utils_1 = require("../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../utils/format_data.utils");
const moment = require("moment");
let vsDefaultMiddleware = class vsDefaultMiddleware {
    constructor(errMessageUrilTh, formatDataUtils, dbconnection) {
        this.errMessageUrilTh = errMessageUrilTh;
        this.formatDataUtils = formatDataUtils;
        this.dbconnection = dbconnection;
    }
    async use(req, res, next) {
        const messageCheckInfo = await this.checkInputValues(req);
        if (messageCheckInfo) {
            console.log('Middleware default  : ' + messageCheckInfo);
            res.send({
                response: {
                    error: messageCheckInfo,
                    result: null,
                    message: messageCheckInfo,
                    statusCode: 200
                }
            });
        }
        else
            next();
    }
    async checkInputValues(req) {
        const body = req.body;
        if (!body.company_id)
            return this.errMessageUrilTh.errCompanyIDNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.company_id))
            return this.errMessageUrilTh.errCompanyIDProhibitSpecial;
        else if (!this.formatDataUtils.IsNumber(body.company_id))
            return this.errMessageUrilTh.errCompanyIDNotNumber;
        else if (this.formatDataUtils.HaveSpecialFormat(body.company_code))
            return this.errMessageUrilTh.errCompanyCodeProhibitSpecial;
        return await this.CheckCompanyInBase(body);
    }
    async CheckCompanyInBase(body) {
        const company_id = body.company_id;
        let sql = `select company_id
        ,to_char(company_start_date,'YYYY-MM-DD HH24:MI:SS') as company_start_date 
        ,to_char(company_expire_date,'YYYY-MM-DD HH24:MI:SS') as company_expire_date
        from m_company where delete_flag = 'N' and company_id =$1;`;
        const query = {
            text: sql,
            values: [company_id]
        };
        const res = await this.dbconnection.getPgData(query);
        if (res.error)
            return res.error;
        else if (res.result.length === 0)
            return this.errMessageUrilTh.errCompanyNotInBase;
        else if (!res.result[0].company_start_date)
            return this.errMessageUrilTh.errCompanyStartDateNotFound;
        else if (!res.result[0].company_expire_date)
            return this.errMessageUrilTh.errCompanyExpireDateNotFound;
        else if (moment() < moment(res.result[0].company_start_date))
            return this.errMessageUrilTh.errCompanyNotStart;
        else if (moment() > moment(res.result[0].company_expire_date))
            return this.errMessageUrilTh.errCompanyIsExpire;
        else
            return null;
    }
};
vsDefaultMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [err_message_th_utils_1.ErrMessageUtilsTH,
        format_data_utils_1.FormatDataUtils,
        pg_database_1.dbConnection])
], vsDefaultMiddleware);
exports.vsDefaultMiddleware = vsDefaultMiddleware;
//# sourceMappingURL=default.middleware.js.map