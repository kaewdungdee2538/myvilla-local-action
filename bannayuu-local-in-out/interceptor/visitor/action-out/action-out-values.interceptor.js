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
exports.ActionOutValuesInterceptor = void 0;
const common_1 = require("@nestjs/common");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../utils/format_data.utils");
const callback_status_1 = require("../../../utils/callback.status");
let ActionOutValuesInterceptor = class ActionOutValuesInterceptor {
    constructor(errMessageUrilTh, formatDataUtils) {
        this.errMessageUrilTh = errMessageUrilTh;
        this.formatDataUtils = formatDataUtils;
    }
    async intercept(context, next) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
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
        console.log(body);
        if (body.tcpl_id) {
            if (this.formatDataUtils.HaveSpecialFormat(body.tcpl_id))
                return this.errMessageUrilTh.errTcplProhitbitSpecial;
            else if (!this.formatDataUtils.IsNumber(body.tcpl_id))
                return this.errMessageUrilTh.errTcplNotNumber;
        }
        if (body.sum_parking_total_after_discount) {
            if (this.formatDataUtils.HaveSpecialFormat(body.sum_parking_total_after_discount))
                return this.errMessageUrilTh.errSumParkingProhitbitSpecial;
            else if (!this.formatDataUtils.IsNumber(body.sum_parking_total_after_discount))
                return this.errMessageUrilTh.errSumParkingNotNumber;
        }
        if (body.sum_overnight_fine_amount) {
            if (this.formatDataUtils.HaveSpecialFormat(body.sum_overnight_fine_amount))
                return this.errMessageUrilTh.errOverFineProhitbitSpecial;
            else if (!this.formatDataUtils.IsNumber(body.sum_overnight_fine_amount))
                return this.errMessageUrilTh.errOverFineNotNumber;
        }
        if (body.payment_type_id) {
            if (this.formatDataUtils.HaveSpecialFormat(body.payment_type_id))
                return this.errMessageUrilTh.errPaymentTypeIdProhitbitSpecial;
            else if (!this.formatDataUtils.IsNumber(body.payment_type_id))
                return this.errMessageUrilTh.errPaymentTypeIdNotNumber;
        }
        return null;
    }
};
ActionOutValuesInterceptor = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [err_message_th_utils_1.ErrMessageUtilsTH,
        format_data_utils_1.FormatDataUtils])
], ActionOutValuesInterceptor);
exports.ActionOutValuesInterceptor = ActionOutValuesInterceptor;
//# sourceMappingURL=action-out-values.interceptor.js.map