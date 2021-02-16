import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
@Injectable()
export class vsCheckCardMiddleware implements NestMiddleware {
    constructor(
        private readonly errMessageUrilTh: ErrMessageUtilsTH,
        private readonly formatDataUtils: FormatDataUtils
    ) { }
    use(req: Request, res: Response, next: () => void) {
        const messageCheckCardInfo = this.checkCardInputValues(req);
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

    checkCardInputValues(req: Request) {
        const body = req.body;
        if(!body.site_id)
            return this.errMessageUrilTh.errSiteIDNotFound;
        else if(this.formatDataUtils.HaveSpecialFormat(body.site_id))
            return this.errMessageUrilTh.errSiteIDProhibitSpecial;
        else if(!this.formatDataUtils.IsNumber(body.site_id))
            return this.errMessageUrilTh.errSiteIDNotNumber;
        else if(this.formatDataUtils.HaveSpecialFormat(body.site_code))
            return this.errMessageUrilTh.errSiteCodeProhibitSpecial;
        else if ((body.card_code && body.card_name) || (!body.card_code && !body.card_name))
            return this.errMessageUrilTh.errGetHaveCardCodeAndCardName;
        else if (body.card_code) {
            if (this.formatDataUtils.HaveSpecialFormat(body.card_code))
                return this.errMessageUrilTh.errGetCardProhibitSpecial;
            else if (!this.formatDataUtils.IsNumber(body.card_code))
                return this.errMessageUrilTh.errGetCardNotNumber;
        }else if(body.card_name){
            if (this.formatDataUtils.HaveSpecialFormat(body.card_name))
                return this.errMessageUrilTh.errGetCardProhibitSpecial;
            else if (!this.formatDataUtils.IsNumber(body.card_name))
                return this.errMessageUrilTh.errGetCardNotNumber;
        }
        return null;
    }
}