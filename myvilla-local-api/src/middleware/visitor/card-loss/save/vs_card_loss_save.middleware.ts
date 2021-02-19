import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { CardManageService } from "src/middleware/card-manage/card-manage.service";
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
@Injectable()
export class vsCardLossSaveMiddleware {
    constructor(
        private readonly errMessageUrilTh: ErrMessageUtilsTH,
        private readonly formatDataUtils: FormatDataUtils,
        private readonly cardManageService: CardManageService
    ) { }

    checkValues(body: any) {
        if (!body.company_id)
            return this.errMessageUrilTh.errCompanyIDNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.company_id))
            return this.errMessageUrilTh.errCompanyIDProhibitSpecial;
        else if (!this.formatDataUtils.IsNumber(body.company_id))
            return this.errMessageUrilTh.errCompanyIDNotNumber;
        else if (this.formatDataUtils.HaveSpecialFormat(body.company_code))
            return this.errMessageUrilTh.errCompanyCodeProhibitSpecial;
        else if (!body.visitor_record_id)
            return this.errMessageUrilTh.errVisitorRecordIdNotFound
        else if (this.formatDataUtils.HaveSpecialFormat(body.visitor_record_id))
            return this.errMessageUrilTh.errVisitorRecordIdProhibitSpecial
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
            return this.errMessageUrilTh.errCustomerPaymentNotFound
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

    async checkCardBefore(body: any) {
        console.log('check cardloss not out ')
        console.log(body)
        if (!body.card_id_before)
            return this.errMessageUrilTh.errCardlossCardIDBeforeNotFound
        else if (this.formatDataUtils.HaveSpecialFormat(body.card_id_before))
            return this.errMessageUrilTh.errCardlossCardIDBeforeProhibitSpecial
        else if (!this.formatDataUtils.IsNumber(body.card_id_before))
            return this.errMessageUrilTh.errCardlossCardIDBeforeNotNumber
        else if (!body.card_code_before)
            return this.errMessageUrilTh.errCardlossCardCodeBeforeNotFound
        else if (this.formatDataUtils.HaveSpecialFormat(body.card_code_before))
            return this.errMessageUrilTh.errCardlossCardCodeBeforeProhibitSpecial
        else if (!this.formatDataUtils.IsNumber(body.card_code_before))
            return this.errMessageUrilTh.errCardlossCardCodeBeforeNotNumber
        else if (!body.card_name_before)
            return this.errMessageUrilTh.errCardlossCardNameBeforeNotFound
        else if (this.formatDataUtils.HaveSpecialFormat(body.card_name_before))
            return this.errMessageUrilTh.errCardlossCardNameBeforeProhibitSpecial
        else if (!this.formatDataUtils.IsNumber(body.card_name_before))
            return this.errMessageUrilTh.errCardlossCardNameBeforeNotNumber
        else if (!body.card_id_after)
            return this.errMessageUrilTh.errCardlossCardIDAfterNotFound
        else if (this.formatDataUtils.HaveSpecialFormat(body.card_id_after))
            return this.errMessageUrilTh.errCardlossCardIDAfterProhibitSpecial
        else if (!this.formatDataUtils.IsNumber(body.card_id_after))
            return this.errMessageUrilTh.errCardlossCardIDAfterNotNumber
        else if (!body.card_code_after)
            return this.errMessageUrilTh.errCardlossCardCodeAfterNotFound
        else if (this.formatDataUtils.HaveSpecialFormat(body.card_code_after))
            return this.errMessageUrilTh.errCardlossCardCodeAfterProhibitSpecial
        else if (!this.formatDataUtils.IsNumber(body.card_code_after))
            return this.errMessageUrilTh.errCardlossCardCodeAfterNotNumber
        else if (!body.card_name_after)
            return this.errMessageUrilTh.errCardlossCardNameAfterNotFound
        else if (this.formatDataUtils.HaveSpecialFormat(body.card_name_after))
            return this.errMessageUrilTh.errCardlossCardNameAfterProhibitSpecial
        else if (!this.formatDataUtils.IsNumber(body.card_name_after))
            return this.errMessageUrilTh.errCardlossCardNameAfterNotNumber
        const inputObjBefore = {
            company_id: body.company_id
            , card_code: !body.card_code_before ? '' : body.card_code_before
            , card_name: !body.card_name_before ? '' : body.card_name_before
        }
        const cardBeforeInbase = await this.cardManageService.getCardInDataBase(inputObjBefore)
        if (!cardBeforeInbase)
            return this.errMessageUrilTh.errCardLossCardBeforeNotInDatabase;
        const cardBeforeCheckIn = await this.cardManageService.getCardCheckIn(inputObjBefore)
        if (!cardBeforeCheckIn)
            return this.errMessageUrilTh.errCardLossCardBeforeIsNotCheckIn;

        const inputObjAfter = {
            company_id: body.company_id
            , card_code: !body.card_code_after ? '' : body.card_code_after
            , card_name: !body.card_name_after ? '' : body.card_name_after
        }
        const cardAfterInbase = await this.cardManageService.getCardInDataBase(inputObjAfter)
        if (!cardAfterInbase)
            return this.errMessageUrilTh.errCardLossCardAfterNotInDatabase;
            const cardAfterCheckIn = await this.cardManageService.getCardCheckIn(inputObjAfter)
        if (cardAfterCheckIn)
            return this.errMessageUrilTh.errCardLossCardAfterIsNotCheckIn;

        return null;
    }


}