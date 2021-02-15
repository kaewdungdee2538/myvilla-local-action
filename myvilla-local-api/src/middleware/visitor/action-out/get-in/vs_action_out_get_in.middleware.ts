import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
@Injectable()
export class vsActionOutGetInMiddleware implements NestMiddleware {
    constructor(
        private readonly errMessageUrilTh: ErrMessageUtilsTH,
        private readonly formatDataUtils: FormatDataUtils
    ) { }
    use(req: Request, res: Response, next: () => void) {
        console.log('cardloss middleware')
        const messageCheckCartypeInfo = this.checkValues(req);
        if (messageCheckCartypeInfo) {
            console.log('Middleware action in : ' + messageCheckCartypeInfo)
            res.send({
                response: {
                    error: messageCheckCartypeInfo
                    , result: null
                    , message: messageCheckCartypeInfo
                    , statusCode: 400
                }
            });
        } else
            next();
    }

    checkValues(req: Request) {
        const body = req.body;
        if (!body.site_id)
            return this.errMessageUrilTh.errGetSiteIDNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.site_id))
            return this.errMessageUrilTh.errGetSiteIDProhibitSpecial;
        else if (!this.formatDataUtils.IsNumber(body.site_id))
            return this.errMessageUrilTh.errGetSiteIDNotNumber;
        return this.checkSlotOrCard(req);
    }

    checkSlotOrCard(req: Request) {
        const body = req.body;
        if (body.visitor_slot_number && (body.card_code || body.card_name))
            return this.errMessageUrilTh.errGetCardOrSlotNumberVisitor;
        else if (!body.visitor_slot_number && (!body.card_code && !body.card_name))
            return this.errMessageUrilTh.errGetCardOrSlotNumberVisitor;
        else if (body.visitor_slot_number) {
            if (this.formatDataUtils.HaveSpecialFormat(body.visitor_slot_number))
                return this.errMessageUrilTh.errGetSlotVisitorNumberSlotNumberProhibitSpecial;
            else if (!this.formatDataUtils.IsNumber(body.visitor_slot_number))
                return this.errMessageUrilTh.errGetSlotVisitorNumberSlotNumberNotNumber;
        } else if (body.card_code && body.card_name)
            return this.errMessageUrilTh.errGetHaveCardCodeAndCardName;
        else if (body.card_code || body.card_name) {
            if (body.card_code) {
                if (this.formatDataUtils.HaveSpecialFormat(body.card_code))
                    return this.errMessageUrilTh.errGetCardProhibitSpecial;
                else if (!this.formatDataUtils.IsNumber(body.card_code))
                    return this.errMessageUrilTh.errGetCardNotNumber;
            } else {
                if (this.formatDataUtils.HaveSpecialFormat(body.card_name))
                    return this.errMessageUrilTh.errGetCardProhibitSpecial;
                else if (!this.formatDataUtils.IsNumber(body.card_name))
                    return this.errMessageUrilTh.errGetCardNotNumber;
            }

        }
        return null;
    }
}