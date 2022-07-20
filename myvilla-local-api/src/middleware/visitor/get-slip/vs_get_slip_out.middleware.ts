import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
@Injectable()
export class vsGetSlipOutMiddleware implements NestMiddleware {
    constructor(
        private readonly errMessageUrilTh: ErrMessageUtilsTH,
        private readonly formatDataUtils: FormatDataUtils
    ) { }
    use(req: Request, res: Response, next: () => void) {
        const messageSlipInfo = this.checkSlipOutValues(req);
        if (messageSlipInfo) {
            console.log('Middleware get slip out : ' + messageSlipInfo)
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

    checkSlipOutValues(req: Request) {
        const body = req.body;
        if (!body.visitor_record_id)
            return this.errMessageUrilTh.errVisitorRecordIdNotFound;
        return null;
    }
}