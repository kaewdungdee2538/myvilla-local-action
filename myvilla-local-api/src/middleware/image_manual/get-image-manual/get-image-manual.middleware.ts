import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
@Injectable()
export class getImageManualMiddleware implements NestMiddleware {
    constructor(
        private readonly errMessageUrilTh: ErrMessageUtilsTH,
        private readonly formatDataUtils: FormatDataUtils
    ) { }
    use(req: Request, res: Response, next: () => void) {
        const messageCheckCartypeInfo = this.checkValues(req);
        if (messageCheckCartypeInfo) {
            console.log('Middleware action in : ' + messageCheckCartypeInfo)
            res.send({
                response: {
                    error: messageCheckCartypeInfo
                    , result: null
                    , message: messageCheckCartypeInfo
                    , statusCode: 400
                }
            });
        } else
            next();
    }
    checkValues(req:Request){
        const body = req.body;
        if(!body.image_path)
            return this.errMessageUrilTh.errImagePathNotFound;
        return null;
    }
}