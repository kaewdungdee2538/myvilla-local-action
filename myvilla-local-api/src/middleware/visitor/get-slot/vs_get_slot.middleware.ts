import { Injectable, NestMiddleware } from "@nestjs/common";
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class VsGetSlotMiddleware implements NestMiddleware {
    constructor(
        private readonly formatUtils: FormatDataUtils,
        private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }
    use(req: Request, res: Response, next: () => void) {
        const messageCheckVisitor = this.checkSiteID(req);
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

    checkSiteID(req: Request){
        const body = req.body;
        if (!body.site_id) {
            return this.errMessageUtilsTh.errGetSlotVisitorNumberSiteIDNotFound;
        } else {
            if(this.formatUtils.HaveSpecialFormat(body.site_id))
                return this.errMessageUtilsTh.errGetSlotVisitorNumberSiteIDProhibitSpecial;
            // else if(!this.formatUtils.IsNumber(body.site_id))
            //     return this.errMessageUtilsTh.errGetSlotVisitorNumberNotNumber;
            return null;
        }
    }
}


@Injectable()
export class VsGetSlotBySlotNumberMiddleware implements NestMiddleware {
    constructor(
        private readonly formatUtils: FormatDataUtils,
        private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }
    use(req: Request, res: Response, next: () => void) {
        const messageCheckVisitor = this.checkSlotNumber(req);
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

    checkSlotNumber(req: Request){
        const body = req.body;
        if (!body.visitor_slot_number) {
            return this.errMessageUtilsTh.errGetSlotVisitorNumberSlotNumberNotFound;
        } else {
            if(this.formatUtils.HaveSpecialFormat(body.visitor_slot_number))
                return this.errMessageUtilsTh.errGetSlotVisitorNumberSlotNumberProhibitSpecial;
            else if(!this.formatUtils.IsNumber(body.visitor_slot_number))
                return this.errMessageUtilsTh.errGetSlotVisitorNumberSlotNumberNotNumber;
            return null;
        }
    }
}