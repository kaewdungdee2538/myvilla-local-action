import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from 'express';
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
@Injectable()
export class EstampGetVisitorInfoMiddleware implements NestMiddleware {
    constructor(
        private readonly errMessageUrilTh: ErrMessageUtilsTH,
        private readonly formatDataUtils: FormatDataUtils,
    ) { }
    async use(req: Request, res: Response, next: () => void) {
        const messageCheckInfo = await this.checkInputValues(req);
        if (messageCheckInfo) {
            console.log('Middleware estamp  : ' + messageCheckInfo)
            res.send({
                response: {
                    error: messageCheckInfo
                    , result: null
                    , message: messageCheckInfo
                    , statusCode: 200
                }
            });
        } else
            next();
    }

    async checkInputValues(req: Request) {
        const body = req.body;
        if ((body.card_code || body.card_name) && body.visitor_slot_number && body.tbv_code)
            return this.errMessageUrilTh.errSelectCardAndSlotAndQrcode
        else if (((body.card_code || body.card_name) && body.tbv_code)||body.visitor_slot_number && body.tbv_code)
            return this.errMessageUrilTh.errNotCardAndSlotAndQrcode
        else if ((body.card_code || body.card_name) && body.visitor_slot_number)
            return this.errMessageUrilTh.errGetCardOrSlotNumberVisitor
        else if (body.card_code && body.card_name)
            return this.errMessageUrilTh.errGetHaveCardCodeAndCardName
        else if (body.card_code) {
            if (this.formatDataUtils.HaveSpecialFormat(body.card_code))
                return this.errMessageUrilTh.errGetCardProhibitSpecial
            else if (!this.formatDataUtils.IsNumber(body.card_code))
                return this.errMessageUrilTh.errGetCardNotNumber;
            return null;
        } else if (body.card_name) {
            if (this.formatDataUtils.HaveSpecialFormat(body.card_name))
                return this.errMessageUrilTh.errGetCardProhibitSpecial
            else if (!this.formatDataUtils.IsNumber(body.card_name))
                return this.errMessageUrilTh.errGetCardNotNumber;
            return null;
        } else if (body.visitor_slot_number) {
            if (this.formatDataUtils.HaveSpecialFormat(body.visitor_slot_number))
                return this.errMessageUrilTh.errGetSlotVisitorNumberSlotNumberProhibitSpecial
            else if (!this.formatDataUtils.IsNumber(body.visitor_slot_number))
                return this.errMessageUrilTh.errGetSlotVisitorNumberSlotNumberNotNumber;
            return null;
        } else if (body.tbv_code) {
            if (this.formatDataUtils.HaveSpecialFormat(body.tbv_code))
                return this.errMessageUrilTh.errฺBookingTbvCodeProhibitSpecial
            return null;
        } else
            return this.errMessageUrilTh.errNotCardAndSlotAndQrcode

    }


}