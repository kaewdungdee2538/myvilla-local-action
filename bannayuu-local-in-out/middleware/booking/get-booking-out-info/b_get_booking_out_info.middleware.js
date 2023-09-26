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
exports.bGetBookingOutInfoMiddleware = void 0;
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../../../pg_database/pg.database");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../utils/format_data.utils");
const load_setting_local_utils_1 = require("../../../utils/load_setting_local.utils");
let bGetBookingOutInfoMiddleware = class bGetBookingOutInfoMiddleware {
    constructor(errMessageUrilTh, loadSettingLocalUtils, dbconnecttion) {
        this.errMessageUrilTh = errMessageUrilTh;
        this.loadSettingLocalUtils = loadSettingLocalUtils;
        this.dbconnecttion = dbconnecttion;
    }
    async use(req, res, next) {
        const messageBookingInfo = await this.checkBookingOutEstamp(req.body);
        console.log(JSON.stringify(messageBookingInfo));
        if (messageBookingInfo) {
            console.log('Middleware booking out : ' + JSON.stringify(messageBookingInfo));
            res.send({
                response: {
                    error: messageBookingInfo,
                    result: null,
                    message: messageBookingInfo,
                    statusCode: 200
                }
            });
        }
        else
            next();
    }
    async checkBookingOutEstamp(body) {
        const company_id = body.company_id;
        const tbv_code = body.tbv_code;
        const checkEstamp = await this.loadSettingLocalUtils.getBookingOutEstampMode(company_id);
        if (checkEstamp) {
            let sql = `
            select visitor_record_id
            from t_visitor_record
            where action_out_flag = 'N'
            and estamp_flag = 'Y'
            and company_id = $1
            and tbv_code = $2
            ;`;
            const query = {
                text: sql,
                values: [company_id, tbv_code]
            };
            const res = await this.dbconnecttion.getPgData(query);
            if (await res.error) {
                console.log(res.error);
                return this.errMessageUrilTh.errBookingGetError;
            }
            else if (res.result.length === 0) {
                console.log('Middle ware Booking Not Estamp');
                return this.errMessageUrilTh.errBookingNotVerifyEstamp;
            }
            else
                return null;
        }
        else {
            let sql = `
            select visitor_record_id
            from t_visitor_record
            where action_out_flag = 'N'
            and company_id = $1
            and tbv_code = $2
            ;`;
            const query = {
                text: sql,
                values: [company_id, tbv_code]
            };
            const res = await this.dbconnecttion.getPgData(query);
            if (await res.error) {
                console.log(res.error);
                return this.errMessageUrilTh.errBookingGetError;
            }
            else if (res.result.length === 0) {
                console.log('Middle ware Booking Not In');
                return this.errMessageUrilTh.errBookingQRCodeNotIn;
            }
            else
                return null;
        }
    }
};
bGetBookingOutInfoMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [err_message_th_utils_1.ErrMessageUtilsTH,
        load_setting_local_utils_1.LoadSettingLocalUtils,
        pg_database_1.dbConnection])
], bGetBookingOutInfoMiddleware);
exports.bGetBookingOutInfoMiddleware = bGetBookingOutInfoMiddleware;
//# sourceMappingURL=b_get_booking_out_info.middleware.js.map