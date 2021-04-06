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
        const messageCheckVisitor = this.checkCompanyID(req);
        if (messageCheckVisitor) {
            console.log('Middleware action in : ' + messageCheckVisitor)
            res.send({
                response: {
                    error: messageCheckVisitor
                    , result: null
                    , message: messageCheckVisitor
                    , statusCode: 200
                }
            });
        } else
            next();
    }

    checkCompanyID(req: Request) {
        const body = req.body;
        if (!body.company_id) {
            return this.errMessageUtilsTh.errGetSlotVisitorNumberCompanyIDNotFound;
        } else {
            if (this.formatUtils.HaveSpecialFormat(body.company_id))
                return this.errMessageUtilsTh.errGetSlotVisitorNumberCompanyIDProhibitSpecial;
            else if (!this.formatUtils.IsNumber(body.company_id))
                return this.errMessageUtilsTh.errGetSlotVisitorNumberCompanyIDNotNumber;
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
            console.log('Middleware action in : ' + messageCheckVisitor)
            res.send({
                response: {
                    error: messageCheckVisitor
                    , result: null
                    , message: messageCheckVisitor
                    , statusCode: 200
                }
            });
        } else
            next();
    }

    checkSlotNumber(req: Request) {
        const body = req.body;
        if (!body.visitor_slot_number) {
            return this.errMessageUtilsTh.errGetSlotVisitorNumberSlotNumberNotFound;
        } else {
            if (this.formatUtils.HaveSpecialFormat(body.visitor_slot_number))
                return this.errMessageUtilsTh.errGetSlotVisitorNumberSlotNumberProhibitSpecial;
            else if (!this.formatUtils.IsNumber(body.visitor_slot_number))
                return this.errMessageUtilsTh.errGetSlotVisitorNumberSlotNumberNotNumber;
            return null;
        }
    }
}