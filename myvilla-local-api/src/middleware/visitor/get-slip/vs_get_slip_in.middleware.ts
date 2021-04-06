import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
@Injectable()
export class vsGetSlipInMiddleware implements NestMiddleware {
    constructor(
        private readonly errMessageUrilTh: ErrMessageUtilsTH,
        private readonly formatDataUtils: FormatDataUtils
    ) { }
    use(req: Request, res: Response, next: () => void) {
        const messageSlipInfo = this.checkSlipInValues(req);
        if (messageSlipInfo) {
            console.log('Middleware action in : ' + messageSlipInfo)
            res.send({
                response: {
                    error: messageSlipInfo
                    , result: null
                    , message: messageSlipInfo
                    , statusCode: 200
                }
            });
        } else
            next();
    }

    checkSlipInValues(req: Request) {
        const body = req.body;
        if (!body.visitor_record_code)
            return this.errMessageUrilTh.errVisitorRecordCodeNotFound;
        return null;
    }
}