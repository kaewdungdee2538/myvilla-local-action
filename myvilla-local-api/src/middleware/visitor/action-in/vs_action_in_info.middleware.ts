import { Injectable, NestMiddleware } from "@nestjs/common";
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class VsActionInInfoMiddleWare{
    constructor(
        private readonly formatUtils: FormatDataUtils,
        private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }
    
    CheclVisitorinfo(body:any){
        return this.checkVisitorValues(body);
    }
    checkVisitorValues(body:any) {
        if (!body.visitor_info) {
            return this.errMessageUtilsTh.errVisitorInfoNotFound;
        } else {
            const visitorInfo = JSON.parse(body.visitor_info);
            if (!visitorInfo.prefix_name)
                return this.errMessageUtilsTh.errVisitorInfoPrefixNameNotFound
            else if (this.formatUtils.HaveSpecialFormat(visitorInfo.prefix_name))
                return this.errMessageUtilsTh.errVisitorInfoPrefixNameProhibitSpecial;
            else if (!visitorInfo.first_name_th)
                return this.errMessageUtilsTh.errVisitorInfoFirstNameNotFound;
            else if (this.formatUtils.HaveSpecialFormat(visitorInfo.first_name_th))
                return this.errMessageUtilsTh.errVisitorInfoFirstNameProhibitSpecial;
            else if (!visitorInfo.last_name_th)
                return this.errMessageUtilsTh.errVisitorInfoLastNameNotFound;
            else if (this.formatUtils.HaveSpecialFormat(visitorInfo.last_name))
                return this.errMessageUtilsTh.errVisitorInfoLastNameProhibitSpecial;
            else if (!visitorInfo.identity_card)
                return this.errMessageUtilsTh.errVisitorInfoIdentityNotFound
            // else if (!this.formatUtils.IsFormatIdentityCard(visitorInfo.identity_card))
            //     return this.errMessageUtilsTh.errVisitorInfoIdentityFormatNotValid;
            return null;
        }
    }
}