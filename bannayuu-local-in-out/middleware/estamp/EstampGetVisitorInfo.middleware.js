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
exports.EstampGetVisitorInfoMiddleware = void 0;
const common_1 = require("@nestjs/common");
const err_message_th_utils_1 = require("../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../utils/format_data.utils");
let EstampGetVisitorInfoMiddleware = class EstampGetVisitorInfoMiddleware {
    constructor(errMessageUrilTh, formatDataUtils) {
        this.errMessageUrilTh = errMessageUrilTh;
        this.formatDataUtils = formatDataUtils;
    }
    async use(req, res, next) {
        const messageCheckInfo = await this.checkInputValues(req);
        if (messageCheckInfo) {
            console.log('Middleware estamp  : ' + messageCheckInfo);
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
        if ((body.card_code || body.card_name) && body.visitor_slot_number && body.tbv_code)
            return this.errMessageUrilTh.errSelectCardAndSlotAndQrcode;
        else if (((body.card_code || body.card_name) && body.tbv_code) || body.visitor_slot_number && body.tbv_code)
            return this.errMessageUrilTh.errNotCardAndSlotAndQrcode;
        else if ((body.card_code || body.card_name) && body.visitor_slot_number)
            return this.errMessageUrilTh.errGetCardOrSlotNumberVisitor;
        else if (body.card_code && body.card_name)
            return this.errMessageUrilTh.errGetHaveCardCodeAndCardName;
        else if (body.card_code) {
            if (this.formatDataUtils.HaveSpecialFormat(body.card_code))
                return this.errMessageUrilTh.errGetCardProhibitSpecial;
            else if (!this.formatDataUtils.IsNumber(body.card_code))
                return this.errMessageUrilTh.errGetCardNotNumber;
            return null;
        }
        else if (body.card_name) {
            if (this.formatDataUtils.HaveSpecialFormat(body.card_name))
                return this.errMessageUrilTh.errGetCardProhibitSpecial;
            else if (!this.formatDataUtils.IsNumber(body.card_name))
                return this.errMessageUrilTh.errGetCardNotNumber;
            return null;
        }
        else if (body.visitor_slot_number) {
            if (this.formatDataUtils.HaveSpecialFormat(body.visitor_slot_number))
                return this.errMessageUrilTh.errGetSlotVisitorNumberSlotNumberProhibitSpecial;
            else if (!this.formatDataUtils.IsNumber(body.visitor_slot_number))
                return this.errMessageUrilTh.errGetSlotVisitorNumberSlotNumberNotNumber;
            return null;
        }
        else if (body.tbv_code) {
            if (this.formatDataUtils.HaveSpecialFormat(body.tbv_code))
                return this.errMessageUrilTh.errฺBookingTbvCodeProhibitSpecial;
            return null;
        }
        else
            return this.errMessageUrilTh.errNotCardAndSlotAndQrcode;
    }
};
EstampGetVisitorInfoMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [err_message_th_utils_1.ErrMessageUtilsTH,
        format_data_utils_1.FormatDataUtils])
], EstampGetVisitorInfoMiddleware);
exports.EstampGetVisitorInfoMiddleware = EstampGetVisitorInfoMiddleware;
//# sourceMappingURL=EstampGetVisitorInfo.middleware.js.map