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
exports.vsCardLossSaveMiddleware = void 0;
const common_1 = require("@nestjs/common");
const card_manage_service_1 = require("../../../card-manage/card-manage.service");
const err_message_th_utils_1 = require("../../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../../utils/format_data.utils");
let vsCardLossSaveMiddleware = class vsCardLossSaveMiddleware {
    constructor(errMessageUrilTh, formatDataUtils, cardManageService) {
        this.errMessageUrilTh = errMessageUrilTh;
        this.formatDataUtils = formatDataUtils;
        this.cardManageService = cardManageService;
    }
    checkValues(body) {
        if (!body.company_id)
            return this.errMessageUrilTh.errCompanyIDNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.company_id))
            return this.errMessageUrilTh.errCompanyIDProhibitSpecial;
        else if (!this.formatDataUtils.IsNumber(body.company_id))
            return this.errMessageUrilTh.errCompanyIDNotNumber;
        else if (this.formatDataUtils.HaveSpecialFormat(body.company_code))
            return this.errMessageUrilTh.errCompanyCodeProhibitSpecial;
        else if (!body.visitor_record_id)
            return this.errMessageUrilTh.errVisitorRecordIdNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.visitor_record_id))
            return this.errMessageUrilTh.errVisitorRecordIdProhibitSpecial;
        else if (!this.formatDataUtils.IsNumber(body.visitor_record_id))
            return this.errMessageUrilTh.errVisitorRecordIdNotNumber;
        else if (!body.guardhouse_id)
            return this.errMessageUrilTh.errGuardHouseIDNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.guardhouse_id))
            return this.errMessageUrilTh.errGuardHouseIDProhibitSpecial;
        else if (!this.formatDataUtils.IsNumber(body.guardhouse_id))
            return this.errMessageUrilTh.errGuardHouseIDNotNumber;
        else if (this.formatDataUtils.HaveSpecialFormat(body.guardhouse_code))
            return this.errMessageUrilTh.errGuardHouseCodeProhibitSpecial;
        else if (!body.employee_out_id)
            return this.errMessageUrilTh.errEmployeeIDNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.employee_out_id))
            return this.errMessageUrilTh.errEmployeeIDProhibitSpecail;
        else if (!this.formatDataUtils.IsNumber(body.employee_out_id))
            return this.errMessageUrilTh.errEmployeeIDNotNumber;
        else if (!body.pos_id)
            return this.errMessageUrilTh.errPosIDNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.pos_id))
            return this.errMessageUrilTh.errPosIDProhibitSpecial;
        else if (!body.cardloss_price)
            return this.errMessageUrilTh.errPriceOfCardlossNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.cardloss_price))
            return this.errMessageUrilTh.errPriceOfCardlossProhibitSpecial;
        else if (!this.formatDataUtils.IsNumber(body.cardloss_price))
            return this.errMessageUrilTh.errPriceOfCardlossNotNumber;
        else if (!body.customer_payment)
            return this.errMessageUrilTh.errCustomerPaymentNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.customer_payment))
            return this.errMessageUrilTh.errCustomerPaymentProhibitSpecial;
        else if (!this.formatDataUtils.IsNumber(body.customer_payment))
            return this.errMessageUrilTh.errCustomerPaymentNotNumber;
        else if (!body.change_money)
            return this.errMessageUrilTh.errChangeMoneyNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.change_money))
            return this.errMessageUrilTh.errChangeMoneyProhibitSpecial;
        else if (!this.formatDataUtils.IsNumber(body.change_money))
            return this.errMessageUrilTh.errChangeMoneyNotNumber;
        else if (body.cardloss_price > body.customer_payment)
            return this.errMessageUrilTh.errPaymentIncomplete;
        return null;
    }
    async checkCardBefore(body) {
        console.log('check cardloss not out ');
        console.log(body);
        if (!body.card_id_before)
            return this.errMessageUrilTh.errCardlossCardIDBeforeNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.card_id_before))
            return this.errMessageUrilTh.errCardlossCardIDBeforeProhibitSpecial;
        else if (!this.formatDataUtils.IsNumber(body.card_id_before))
            return this.errMessageUrilTh.errCardlossCardIDBeforeNotNumber;
        else if (!body.card_code_before)
            return this.errMessageUrilTh.errCardlossCardCodeBeforeNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.card_code_before))
            return this.errMessageUrilTh.errCardlossCardCodeBeforeProhibitSpecial;
        else if (!this.formatDataUtils.IsNumber(body.card_code_before))
            return this.errMessageUrilTh.errCardlossCardCodeBeforeNotNumber;
        else if (!body.card_name_before)
            return this.errMessageUrilTh.errCardlossCardNameBeforeNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.card_name_before))
            return this.errMessageUrilTh.errCardlossCardNameBeforeProhibitSpecial;
        else if (!body.card_id_after)
            return this.errMessageUrilTh.errCardlossCardIDAfterNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.card_id_after))
            return this.errMessageUrilTh.errCardlossCardIDAfterProhibitSpecial;
        else if (!this.formatDataUtils.IsNumber(body.card_id_after))
            return this.errMessageUrilTh.errCardlossCardIDAfterNotNumber;
        else if (!body.card_code_after)
            return this.errMessageUrilTh.errCardlossCardCodeAfterNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.card_code_after))
            return this.errMessageUrilTh.errCardlossCardCodeAfterProhibitSpecial;
        else if (!this.formatDataUtils.IsNumber(body.card_code_after))
            return this.errMessageUrilTh.errCardlossCardCodeAfterNotNumber;
        else if (!body.card_name_after)
            return this.errMessageUrilTh.errCardlossCardNameAfterNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.card_name_after))
            return this.errMessageUrilTh.errCardlossCardNameAfterProhibitSpecial;
        const inputObjBefore = {
            company_id: body.company_id,
            card_code: !body.card_code_before ? '' : body.card_code_before,
            card_name: !body.card_name_before ? '' : body.card_name_before
        };
        const cardBeforeInbase = await this.cardManageService.getCardInDataBase(inputObjBefore);
        if (!cardBeforeInbase)
            return this.errMessageUrilTh.errCardLossCardBeforeNotInDatabase;
        const cardBeforeCheckIn = await this.cardManageService.getCardCheckIn(inputObjBefore);
        if (!cardBeforeCheckIn)
            return this.errMessageUrilTh.errCardLossCardBeforeIsNotCheckIn;
        const inputObjAfter = {
            company_id: body.company_id,
            card_code: !body.card_code_after ? '' : body.card_code_after,
            card_name: !body.card_name_after ? '' : body.card_name_after
        };
        const cardAfterInbase = await this.cardManageService.getCardInDataBase(inputObjAfter);
        if (!cardAfterInbase)
            return this.errMessageUrilTh.errCardLossCardAfterNotInDatabase;
        const cardAfterCheckIn = await this.cardManageService.getCardCheckIn(inputObjAfter);
        if (cardAfterCheckIn)
            return this.errMessageUrilTh.errCardLossCardAfterIsNotCheckIn;
        return null;
    }
};
vsCardLossSaveMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [err_message_th_utils_1.ErrMessageUtilsTH,
        format_data_utils_1.FormatDataUtils,
        card_manage_service_1.CardManageService])
], vsCardLossSaveMiddleware);
exports.vsCardLossSaveMiddleware = vsCardLossSaveMiddleware;
//# sourceMappingURL=vs_card_loss_save.middleware.js.map