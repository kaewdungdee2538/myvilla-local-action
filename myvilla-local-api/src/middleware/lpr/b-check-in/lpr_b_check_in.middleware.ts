import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";

@Injectable()
export class LPRBookingCheckInMiddleware implements NestMiddleware {
    constructor(
        private readonly errMessageUtilsTh: ErrMessageUtilsTH,
        private readonly formatUtils: FormatDataUtils
    ) { }
    use(req: Request, res: Response, next: () => void) {
        console.log('middleware lpr booking in')
        const messageBookingInfo = this.CheckLPRBoolingCheckIn(req);
        if (messageBookingInfo) {
            console.log('Middleware lpr booking in : ' + JSON.stringify(messageBookingInfo))
            res.send({
                response: {
                    error: messageBookingInfo
                    , result: null
                    , message: messageBookingInfo
                    , statusCode: 200
                }
            });
        } else
            next();
    }

     CheckLPRBoolingCheckIn(body: any) {
        if(!body.license_plate)
            return this.errMessageUtilsTh.errLicensePlateNotFound
        else if(this.formatUtils.HaveSpecialHomeFormat(body.license_plate))
            return this.errMessageUtilsTh.errLicensePlateProhibitSpecial
        return null;
    }
}