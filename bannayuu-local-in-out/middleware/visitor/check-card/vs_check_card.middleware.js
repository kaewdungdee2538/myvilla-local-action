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
exports.vsCheckCardMiddleware = void 0;
const common_1 = require("@nestjs/common");
const card_manage_service_1 = require("../../card-manage/card-manage.service");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../utils/format_data.utils");
let vsCheckCardMiddleware = class vsCheckCardMiddleware {
    constructor(errMessageUrilTh, formatDataUtils, cardManageService) {
        this.errMessageUrilTh = errMessageUrilTh;
        this.formatDataUtils = formatDataUtils;
        this.cardManageService = cardManageService;
    }
    async use(req, res, next) {
        const messageCheckCardInfo = await this.checkCardInputValues(req);
        if (messageCheckCardInfo) {
            console.log('Middleware check card  : ' + messageCheckCardInfo);
            res.send({
                response: {
                    error: messageCheckCardInfo,
                    result: null,
                    message: messageCheckCardInfo,
                    statusCode: 200
                }
            });
        }
        else
            next();
    }
    async checkCardInputValues(req) {
        const body = req.body;
        if (!body.company_id)
            return this.errMessageUrilTh.errCompanyIDNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.company_id))
            return this.errMessageUrilTh.errCompanyIDProhibitSpecial;
        else if (!this.formatDataUtils.IsNumber(body.company_id))
            return this.errMessageUrilTh.errCompanyIDNotNumber;
        else if (this.formatDataUtils.HaveSpecialFormat(body.company_code))
            return this.errMessageUrilTh.errCompanyCodeProhibitSpecial;
        else if ((body.card_code && body.card_name) || (!body.card_code && !body.card_name))
            return this.errMessageUrilTh.errGetHaveCardCodeAndCardName;
        else if (body.card_code) {
            if (this.formatDataUtils.HaveSpecialFormat(body.card_code))
                return this.errMessageUrilTh.errGetCardProhibitSpecial;
            else if (!this.formatDataUtils.IsNumber(body.card_code))
                return this.errMessageUrilTh.errGetCardNotNumber;
        }
        else if (body.card_name) {
            if (this.formatDataUtils.HaveSpecialFormat(body.card_name))
                return this.errMessageUrilTh.errGetCardProhibitSpecial;
            else if (!this.formatDataUtils.IsNumber(body.card_name))
                return this.errMessageUrilTh.errGetCardNotNumber;
        }
        const inputObj = {
            company_id: body.company_id,
            card_code: !body.card_code ? '' : body.card_code,
            card_name: !body.card_name ? '' : body.card_name
        };
        const cardInbase = await this.cardManageService.getCardInDataBase(inputObj);
        if (!cardInbase)
            return this.errMessageUrilTh.errGetCardNotInDatabase;
        const cardCheckIn = await this.cardManageService.getCardCheckIn(inputObj);
        if (cardCheckIn)
            return this.errMessageUrilTh.errGetCardIsDuplicate;
        return null;
    }
};
vsCheckCardMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [err_message_th_utils_1.ErrMessageUtilsTH,
        format_data_utils_1.FormatDataUtils,
        card_manage_service_1.CardManageService])
], vsCheckCardMiddleware);
exports.vsCheckCardMiddleware = vsCheckCardMiddleware;
//# sourceMappingURL=vs_check_card.middleware.js.map