import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
@Injectable()
export class bGetBookingInfoMiddleware implements NestMiddleware {
    constructor(
        private readonly errMessageUrilTh: ErrMessageUtilsTH,
        private readonly formatDataUtils: FormatDataUtils
    ) { }
    use(req: Request, res: Response, next: () => void) {
        const messageBookingInfo = this.checkBookingValues(req);
        if (messageBookingInfo) {
            console.log('Middleware booking in : ' + JSON.stringify(messageBookingInfo))
            res.send({
                response: {
                    error: messageBookingInfo
                    , result: null
                    , message: messageBookingInfo
                    , statusCode: 400
                }
            });
        } else
            next();
    }

    checkBookingValues(req:Request){
        const body = req.body;
        if(!body.tbv_code)
            return this.errMessageUrilTh.errฺBookingTbvCodeNotFound
        else if(this.formatDataUtils.HaveSpecialFormat(body.tbv_code))
            return this.errMessageUrilTh.errฺBookingTbvCodeProhibitSpecial
        return null;
    }
}