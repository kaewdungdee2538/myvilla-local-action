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
exports.SosSaveGetInfoById = void 0;
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../../pg_database/pg.database");
const err_message_th_utils_1 = require("../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../utils/format_data.utils");
let SosSaveGetInfoById = class SosSaveGetInfoById {
    constructor(errMessageUrilTh, formatDataUtils, dbconnection) {
        this.errMessageUrilTh = errMessageUrilTh;
        this.formatDataUtils = formatDataUtils;
        this.dbconnection = dbconnection;
    }
    async use(req, res, next) {
        const messageCheckvalue = await this.CheckValues(req.body);
        if (messageCheckvalue) {
            console.log('Middleware check get sos save by id value  : ' + messageCheckvalue);
            res.send({
                response: {
                    error: messageCheckvalue,
                    result: null,
                    message: messageCheckvalue,
                    statusCode: 200
                }
            });
        }
        else
            next();
    }
    async CheckValues(body) {
        if (!body.sos_remark)
            return this.errMessageUrilTh.errRemarkNofound;
        else if (this.formatDataUtils.HaveSpecialHomeFormat(body.sos_remark))
            return this.errMessageUrilTh.errReamrkPohibitSpecial;
        else if (!body.sos_id)
            return this.errMessageUrilTh.errSosIdNotfound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.sos_id))
            return this.errMessageUrilTh.errSosIdProhibitSpecial;
        else if (!this.formatDataUtils.IsNumber(body.sos_id))
            return this.errMessageUrilTh.errSosIdNotNumber;
        else
            return await this.checkSosInBase(body);
    }
    async checkSosInBase(body) {
        const company_id = body.company_id;
        const sos_id = body.sos_id;
        let sql = `select sos_id,sos_status from h_sos_info
        where delete_flag = 'N' and company_id = $1 and sos_id = $2 ;`;
        const query = {
            text: sql,
            values: [company_id, sos_id]
        };
        const res = await this.dbconnection.getPgData(query);
        if (res.error)
            return res.error;
        else if (res.result.length === 0)
            return this.errMessageUrilTh.errSosNotInbase;
        else if (res.result[0].sos_status.toUpperCase() === 'Y')
            return this.errMessageUrilTh.errSosActionDuplicate;
        else
            return null;
    }
};
SosSaveGetInfoById = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [err_message_th_utils_1.ErrMessageUtilsTH,
        format_data_utils_1.FormatDataUtils,
        pg_database_1.dbConnection])
], SosSaveGetInfoById);
exports.SosSaveGetInfoById = SosSaveGetInfoById;
;
//# sourceMappingURL=sos-save-receive.middleware.js.map