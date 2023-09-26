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
exports.BActionOutMiddleware = void 0;
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../../../pg_database/pg.database");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../utils/format_data.utils");
let BActionOutMiddleware = class BActionOutMiddleware {
    constructor(formatUtils, errMessageUtilsTh, dbconnecttion) {
        this.formatUtils = formatUtils;
        this.errMessageUtilsTh = errMessageUtilsTh;
        this.dbconnecttion = dbconnecttion;
    }
    async CheckSaveIn(body) {
        const checkvalues = this.checkValues(body);
        if (checkvalues)
            return checkvalues;
        return await this.checkValuesTBVCode(body);
    }
    checkValues(body) {
        if (!body.company_id)
            return this.errMessageUtilsTh.errCompanyIDNotFound;
        else if (this.formatUtils.HaveSpecialFormat(body.company_id))
            return this.errMessageUtilsTh.errCompanyIDProhibitSpecial;
        else if (!this.formatUtils.IsNumber(body.company_id))
            return this.errMessageUtilsTh.errCompanyIDNotNumber;
        else if (this.formatUtils.HaveSpecialFormat(body.company_code))
            return this.errMessageUtilsTh.errCompanyCodeProhibitSpecial;
        else if (!body.guardhouse_out_id)
            return this.errMessageUtilsTh.errGuardHouseIDNotFound;
        else if (this.formatUtils.HaveSpecialFormat(body.guardhouse_out_id))
            return this.errMessageUtilsTh.errGuardHouseIDProhibitSpecial;
        else if (!this.formatUtils.IsNumber(body.guardhouse_out_id))
            return this.errMessageUtilsTh.errGuardHouseIDNotNumber;
        else if (this.formatUtils.HaveSpecialFormat(body.guardhouse_out_code))
            return this.errMessageUtilsTh.errGuardHouseCodeProhibitSpecial;
        else if (!body.employee_out_id)
            return this.errMessageUtilsTh.errEmployeeIDNotFound;
        else if (this.formatUtils.HaveSpecialFormat(body.employee_out_id))
            return this.errMessageUtilsTh.errEmployeeIDProhibitSpecail;
        else if (!this.formatUtils.IsNumber(body.employee_out_id))
            return this.errMessageUtilsTh.errEmployeeIDNotNumber;
        return null;
    }
    async checkValuesTBVCode(body) {
        if (!body.tbv_code)
            return this.errMessageUtilsTh.errฺBookingTbvCodeNotFound;
        else if (this.formatUtils.HaveSpecialFormat(body.tbv_code))
            return this.errMessageUtilsTh.errฺBookingTbvCodeProhibitSpecial;
        const TbvCodeInBase = await this.checkTbvCodeInbase(body);
        console.log(TbvCodeInBase);
        if (TbvCodeInBase) {
            if (!TbvCodeInBase.visitor_record_code)
                return this.errMessageUtilsTh.errBookingQRCodeNotIn;
        }
        else
            return this.errMessageUtilsTh.errBookingQRNotFound;
        return null;
    }
    async checkTbvCodeInbase(body) {
        const company_id = body.company_id;
        const tbv_code = body.tbv_code;
        let sql = `select tbv.tbv_code,tvr.visitor_record_code
        from 
        t_booking_visitor tbv
        left join t_visitor_record  tvr on tbv.tbv_code = tvr.tbv_code
        where tbv.delete_flag = 'N'
        and tbv.company_id = $1
        and tbv.tbv_code = $2
        limit 1
        ;`;
        const query = {
            text: sql,
            values: [company_id, tbv_code]
        };
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error) {
            console.log(res.error);
            return null;
        }
        else if (res.result.length === 0) {
            console.log('Booking No data');
            return null;
        }
        return res.result[0];
    }
};
BActionOutMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [format_data_utils_1.FormatDataUtils,
        err_message_th_utils_1.ErrMessageUtilsTH,
        pg_database_1.dbConnection])
], BActionOutMiddleware);
exports.BActionOutMiddleware = BActionOutMiddleware;
//# sourceMappingURL=b_action_out.middleware.js.map