import { Injectable, NestMiddleware } from "@nestjs/common";
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
import { Request, Response, NextFunction } from 'express';
import { CardManageService } from "src/middleware/card-manage/card-manage.service";
import { SlotManageService } from "src/middleware/slot-manage/slot-manage.service";

@Injectable()
export class VsActionOutSlotOrCardMiddleWare {
    constructor(
        private readonly formatUtils: FormatDataUtils,
        private readonly errMessageUtilsTh: ErrMessageUtilsTH,
        private readonly slotManageService: SlotManageService,
        private readonly cardManageService: CardManageService
    ) { }

    async CheckVisitorOut(body: any) {
        return await this.checkSlotOrCard(body);
    }
    async checkSlotOrCard(body: any) {
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
        } else if (body.card_code && body.card_name)
            return this.errMessageUtilsTh.errGetHaveCardCodeAndCardName
        else if (body.card_code || body.card_name) {
            if (body.card_code) {
                if (this.formatUtils.HaveSpecialFormat(body.card_code))
                    return this.errMessageUtilsTh.errGetCardProhibitSpecial;
                else if (!this.formatUtils.IsNumber(body.card_code))
                    return this.errMessageUtilsTh.errGetCardNotNumber;
            } else {
                if (this.formatUtils.HaveSpecialFormat(body.card_name))
                    return this.errMessageUtilsTh.errGetCardProhibitSpecial;
                else if (!this.formatUtils.IsNumber(body.card_name))
                    return this.errMessageUtilsTh.errGetCardNotNumber;
            }
            const inputObj = {
                company_id: body.company_id
                , card_code: !body.card_code ? '' : body.card_code
                , card_name: !body.card_name ? '' : body.card_name
            }
            console.log(inputObj)
            const cardInbase = await this.cardManageService.getCardInDataBase(inputObj)
            if (!cardInbase)
                return this.errMessageUtilsTh.errGetCardNotInDatabase;
            const cardCheckIn = await this.cardManageService.getCardCheckIn(inputObj)
            if (!cardCheckIn)
                return this.errMessageUtilsTh.errGetCardIsNotCheckIn;
            return null;
        }

    }
}