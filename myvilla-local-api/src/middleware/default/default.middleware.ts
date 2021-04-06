import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from 'express';
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
@Injectable()
export class vsDefaultMiddleware implements NestMiddleware {
    constructor(
        private readonly errMessageUrilTh: ErrMessageUtilsTH,
        private readonly formatDataUtils: FormatDataUtils,
    ) { }
    async use(req: Request, res: Response, next: () => void) {
        const messageCheckInfo = await this.checkInputValues(req);
        if (messageCheckInfo) {
            console.log('Middleware default  : ' + messageCheckInfo)
            res.send({
                response: {
                    error: messageCheckInfo
                    , result: null
                    , message: messageCheckInfo
                    , statusCode: 200
                }
            });
        } else
            next();
    }

    async checkInputValues(req: Request) {
        const body = req.body;
        if (!body.company_id)
            return this.errMessageUrilTh.errCompanyIDNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.company_id))
            return this.errMessageUrilTh.errCompanyIDProhibitSpecial;
        else if (!this.formatDataUtils.IsNumber(body.company_id))
            return this.errMessageUrilTh.errCompanyIDNotNumber;
        else if (this.formatDataUtils.HaveSpecialFormat(body.company_code))
            return this.errMessageUrilTh.errCompanyCodeProhibitSpecial;
        return null;
    }


}