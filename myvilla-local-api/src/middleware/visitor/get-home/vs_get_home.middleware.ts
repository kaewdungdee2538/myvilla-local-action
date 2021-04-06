import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
@Injectable()
export class vsGetHomeMiddleware implements NestMiddleware {
    constructor(
        private readonly errMessageUrilTh: ErrMessageUtilsTH,
        private readonly formatDataUtils: FormatDataUtils
    ) { }
    use(req: Request, res: Response, next: () => void) {
        const messageCheckHomeInfo = this.checkHomeInputValues(req);
        if (messageCheckHomeInfo) {
            console.log('Middleware action in : ' + messageCheckHomeInfo)
            res.send({
                response: {
                    error: messageCheckHomeInfo
                    , result: null
                    , message: messageCheckHomeInfo
                    , statusCode: 200
                }
            });
        } else
            next();
    }

    checkHomeInputValues(req: Request) {
        const body = req.body;
        if (!body.company_id)
            return this.errMessageUrilTh.errGetCompanyIDNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.company_id))
            return this.errMessageUrilTh.errGetCompanyIDProhibitSpecial;
        else if (!this.formatDataUtils.IsNumber(body.company_id))
            return this.errMessageUrilTh.errGetCompanyIDNotNumber;
        else if (!body.guardhouse_id)
            return this.errMessageUrilTh.errGetGuardhouseIDNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.guardhouse_id))
            return this.errMessageUrilTh.errGetGuardhouseIDProhibitSpecial;
        else if (!this.formatDataUtils.IsNumber(body.guardhouse_id))
            return this.errMessageUrilTh.errGetGuardhouseIDNotNumber;
        return null;
    }
}