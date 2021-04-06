import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
@Injectable()
export class vsGetCartypeCategoryMiddleware implements NestMiddleware {
    constructor(
        private readonly errMessageUrilTh: ErrMessageUtilsTH,
        private readonly formatDataUtils: FormatDataUtils
    ) { }
    use(req: Request, res: Response, next: () => void) {
        const messageCheckCartypeInfo = this.checkCartypeInputValues(req);
        if (messageCheckCartypeInfo) {
            console.log('Middleware action in : ' + messageCheckCartypeInfo)
            res.send({
                response: {
                    error: messageCheckCartypeInfo
                    , result: null
                    , message: messageCheckCartypeInfo
                    , statusCode: 200
                }
            });
        } else
            next();
    }

    checkCartypeInputValues(req: Request) {
        const body = req.body;
        if (!body.cartype_id)
            return this.errMessageUrilTh.errGetCarTypeNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.cartype_id))
            return this.errMessageUrilTh.errGetCarTypeProhibitSpecial;
        else if (!this.formatDataUtils.IsNumber(body.cartype_id))
            return this.errMessageUrilTh.errGetCarTypeNotNumber;
        return null;
    }
}