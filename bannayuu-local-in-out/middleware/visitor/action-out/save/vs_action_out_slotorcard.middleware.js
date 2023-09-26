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
exports.VsActionOutSlotOrCardMiddleWare = void 0;
const common_1 = require("@nestjs/common");
const err_message_th_utils_1 = require("../../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../../utils/format_data.utils");
const card_manage_service_1 = require("../../../card-manage/card-manage.service");
const slot_manage_service_1 = require("../../../slot-manage/slot-manage.service");
let VsActionOutSlotOrCardMiddleWare = class VsActionOutSlotOrCardMiddleWare {
    constructor(formatUtils, errMessageUtilsTh, slotManageService, cardManageService) {
        this.formatUtils = formatUtils;
        this.errMessageUtilsTh = errMessageUtilsTh;
        this.slotManageService = slotManageService;
        this.cardManageService = cardManageService;
    }
    async CheckVisitorOut(body) {
        return await this.checkSlotOrCard(body);
    }
    async checkSlotOrCard(body) {
        if (body.visitor_slot_number === "null")
            body.visitor_slot_number = null;
        if (body.card_code === "null")
            body.card_code = null;
        if (body.card_name === "null")
            body.card_name = null;
        if ((body.visitor_slot_number && (body.card_code || body.card_name)) || (!body.visitor_slot_number && !body.card_code && !body.card_name))
            return this.errMessageUtilsTh.errGetCardOrSlotNumberVisitor;
        else if (body.visitor_slot_number) {
            if (this.formatUtils.HaveSpecialFormat(body.visitor_slot_number))
                return this.errMessageUtilsTh.errGetSlotVisitorNumberSlotNumberProhibitSpecial;
            else if (!this.formatUtils.IsNumber(body.visitor_slot_number))
                return this.errMessageUtilsTh.errGetSlotVisitorNumberSlotNumberNotNumber;
            const getSlotInBase = await this.slotManageService.getSlotNumberInDataBase({ company_id: body.company_id, visitor_slot_number: body.visitor_slot_number });
            if (!getSlotInBase)
                return this.errMessageUtilsTh.errGetSlotVisitorNumberNotInDataBase;
            const getslotCheckIn = await this.slotManageService.getSlotNumberCheckIn({ company_id: body.company_id, visitor_slot_number: body.visitor_slot_number });
            if (!getslotCheckIn)
                return this.errMessageUtilsTh.errGetSlotVisitorNumberIsNotCheckIn;
            return null;
        }
        else if (body.card_code && body.card_name)
            return this.errMessageUtilsTh.errGetHaveCardCodeAndCardName;
        else if (body.card_code || body.card_name) {
            if (body.card_code) {
                if (this.formatUtils.HaveSpecialFormat(body.card_code))
                    return this.errMessageUtilsTh.errGetCardProhibitSpecial;
                else if (!this.formatUtils.IsNumber(body.card_code))
                    return this.errMessageUtilsTh.errGetCardNotNumber;
            }
            else {
                if (this.formatUtils.HaveSpecialFormat(body.card_name))
                    return this.errMessageUtilsTh.errGetCardProhibitSpecial;
                else if (!this.formatUtils.IsNumber(body.card_name))
                    return this.errMessageUtilsTh.errGetCardNotNumber;
            }
            const inputObj = {
                company_id: body.company_id,
                card_code: !body.card_code ? '' : body.card_code,
                card_name: !body.card_name ? '' : body.card_name
            };
            console.log(inputObj);
            const cardInbase = await this.cardManageService.getCardInDataBase(inputObj);
            if (!cardInbase)
                return this.errMessageUtilsTh.errGetCardNotInDatabase;
            const cardCheckIn = await this.cardManageService.getCardCheckIn(inputObj);
            if (!cardCheckIn)
                return this.errMessageUtilsTh.errGetCardIsNotCheckIn;
            return null;
        }
    }
};
VsActionOutSlotOrCardMiddleWare = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [format_data_utils_1.FormatDataUtils,
        err_message_th_utils_1.ErrMessageUtilsTH,
        slot_manage_service_1.SlotManageService,
        card_manage_service_1.CardManageService])
], VsActionOutSlotOrCardMiddleWare);
exports.VsActionOutSlotOrCardMiddleWare = VsActionOutSlotOrCardMiddleWare;
//# sourceMappingURL=vs_action_out_slotorcard.middleware.js.map