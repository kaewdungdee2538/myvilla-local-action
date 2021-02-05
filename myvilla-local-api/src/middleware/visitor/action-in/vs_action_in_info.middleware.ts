import { Injectable, NestMiddleware } from "@nestjs/common";
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class VsActionInInfoMiddleWare implements NestMiddleware {
    constructor(
        private readonly formatUtils: FormatDataUtils,
        private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }
    use(req: Request, res: Response, next: () => void) {
        const messageCheckVisitor = this.checkVisitorValues(req);
        if (messageCheckVisitor) {
            console.log('Middleware action in : '+messageCheckVisitor)
            res.send({
                response: {
                    error: messageCheckVisitor
                    , result: null
                    , message: messageCheckVisitor
                    , statusCode: 400
                }
            });
        } else
            next();
    }
    checkVisitorValues(req: Request) {
        const body = req.body;
        if (!body.visitor_info) {
            return this.errMessageUtilsTh.errVisitorInfoNotFound;
        } else {
            const visitorInfo = body.visitor_info;
            if (!visitorInfo.prefix_name)
                return this.errMessageUtilsTh.errVisitorInfoPrefixNameNotFound
            else if (this.formatUtils.HaveSpecialFormat(visitorInfo.prefix_name))
                return this.errMessageUtilsTh.errVisitorInfoPrefixNameProhibitSpecial;
            else if (!visitorInfo.first_name_th)
                return this.errMessageUtilsTh.errVisitorInfoFirstNameNotFound;
            else if (this.formatUtils.HaveSpecialFormat(visitorInfo.first_name_th))
                return this.errMessageUtilsTh.errVisitorInfoFirstNameProhibitSpecial;
            else if (!visitorInfo.last_name)
                return this.errMessageUtilsTh.errVisitorInfoLastNameNotFound;
            else if (this.formatUtils.HaveSpecialFormat(visitorInfo.last_name))
                return this.errMessageUtilsTh.errVisitorInfoLastNameProhibitSpecial;
            else if (!visitorInfo.identity)
                return this.errMessageUtilsTh.errVisitorInfoIdentityNotFound
            else if (!this.formatUtils.IsNumber(visitorInfo.identity))
                return this.errMessageUtilsTh.errVisitorInfoIdentityNotNumber;
            else if (!this.formatUtils.IsFormatIdentityCard)
                return this.errMessageUtilsTh.errVisitorInfoIdentityFormatNotValid;
            return null;
        }
    }
}