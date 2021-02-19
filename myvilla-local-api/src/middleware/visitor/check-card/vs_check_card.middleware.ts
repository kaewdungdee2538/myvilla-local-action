import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { CardManageService } from "src/middleware/card-manage/card-manage.service";
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
@Injectable()
export class vsCheckCardMiddleware implements NestMiddleware {
    constructor(
        private readonly errMessageUrilTh: ErrMessageUtilsTH,
        private readonly formatDataUtils: FormatDataUtils,
        private readonly cardManageService: CardManageService
    ) { }
    async use(req: Request, res: Response, next: () => void) {
        const messageCheckCardInfo = await this.checkCardInputValues(req);
        if (messageCheckCardInfo) {
            console.log('Middleware check card  : ' + messageCheckCardInfo)
            res.send({
                response: {
                    error: messageCheckCardInfo
                    , result: null
                    , message: messageCheckCardInfo
                    , statusCode: 400
                }
            });
        } else
            next();
    }

    async checkCardInputValues(req: Request) {
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
        } else if (body.card_name) {
            if (this.formatDataUtils.HaveSpecialFormat(body.card_name))
                return this.errMessageUrilTh.errGetCardProhibitSpecial;
            else if (!this.formatDataUtils.IsNumber(body.card_name))
                return this.errMessageUrilTh.errGetCardNotNumber;
        }
        const inputObj = {
            company_id: body.company_id
            , card_code: !body.card_code ? '' : body.card_code
            , card_name: !body.card_name ? '' : body.card_name
        }
        const cardInbase = await this.cardManageService.getCardInDataBase(inputObj)
        if (!cardInbase)
            return this.errMessageUrilTh.errGetCardNotInDatabase;
        const cardCheckIn = await this.cardManageService.getCardCheckIn(inputObj)
        if (cardCheckIn)
            return this.errMessageUrilTh.errGetCardIsDuplicate;
        return null;
    }


}