import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
@Injectable()
export class vsCardLossSaveMiddleware {
    constructor(
        private readonly errMessageUrilTh: ErrMessageUtilsTH,
        private readonly formatDataUtils: FormatDataUtils
    ) { }

    checkValues(body: any) {
        console.log(body);
        if (!body.site_id)
            return this.errMessageUrilTh.errSiteIDNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.site_id))
            return this.errMessageUrilTh.errSiteIDProhibitSpecial;
        else if (!this.formatDataUtils.IsNumber(body.site_id))
            return this.errMessageUrilTh.errSiteIDNotNumber;
        else if (this.formatDataUtils.HaveSpecialFormat(body.site_code))
            return this.errMessageUrilTh.errSiteCodeProhibitSpecial;
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
        else if (!body.employee_id)
            return this.errMessageUrilTh.errEmployeeIDNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.employee_id))
            return this.errMessageUrilTh.errEmployeeIDProhibitSpecail;
        else if (!this.formatDataUtils.IsNumber(body.employee_id))
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
}