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
exports.LPRBookingCheckInMiddleware = void 0;
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../../../pg_database/pg.database");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../utils/format_data.utils");
let LPRBookingCheckInMiddleware = class LPRBookingCheckInMiddleware {
    constructor(errMessageUtilsTh, formatUtils, dbconnection) {
        this.errMessageUtilsTh = errMessageUtilsTh;
        this.formatUtils = formatUtils;
        this.dbconnection = dbconnection;
    }
    async use(req, res, next) {
        console.log('middleware lpr booking in');
        const messageBookingInfo = await this.CheckLPRBoolingCheckIn(req.body);
        if (messageBookingInfo) {
            console.log('Middleware lpr booking in : ' + JSON.stringify(messageBookingInfo));
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
    async CheckLPRBoolingCheckIn(body) {
        if (!body.license_plate)
            return this.errMessageUtilsTh.errLicensePlateNotFound;
        else if (this.formatUtils.HaveSpecialHomeFormat(body.license_plate))
            return this.errMessageUtilsTh.errLicensePlateProhibitSpecial;
        else
            return await this.checkLPRBookingInBase(body);
    }
    async checkLPRBookingInBase(body) {
        const company_id = body.company_id;
        const license_plate = body.license_plate;
        let sql = `select 
        tbv.tbv_id,tbv.tbv_code
        from t_booking_visitor tbv
        where tbv.delete_flag = 'N'
        and current_timestamp < tbv_end_datetime
        and tbv.company_id = $1
        and tbv_license_plate = $2
        ;`;
        const query = {
            text: sql,
            values: [company_id, license_plate]
        };
        const res = await this.dbconnection.getPgData(query);
        if (await res.error)
            return this.errMessageUtilsTh.messageProcessFail;
        else if (await res.result.length === 0)
            return this.errMessageUtilsTh.errBookingNotFound;
        else if (await res.result.length > 1)
            return this.errMessageUtilsTh.errBookingLicenseIsDuplicate;
        else
            return null;
    }
};
LPRBookingCheckInMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [err_message_th_utils_1.ErrMessageUtilsTH,
        format_data_utils_1.FormatDataUtils,
        pg_database_1.dbConnection])
], LPRBookingCheckInMiddleware);
exports.LPRBookingCheckInMiddleware = LPRBookingCheckInMiddleware;
//# sourceMappingURL=lpr_b_check_in.middleware.js.map