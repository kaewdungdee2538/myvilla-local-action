import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class VsActionInSaveMiddleware implements NestMiddleware {
    constructor(
        private readonly formatUtils: FormatDataUtils,
        private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }
    use(req: Request, res: Response, next: () => void) {
        console.log(req);
        const messageCheckValues = this.checkValuesActionInSave(req)
        if (messageCheckValues){
            console.log('Middleware action in : '+messageCheckValues);
            res.send({
                response: {
                    error: messageCheckValues
                    , result: null
                    , message: messageCheckValues
                    , statusCode: 400
                }
            });
        }else
            next();
    }

    checkValuesActionInSave(req: Request) {
        const body = req.body;
        if (!body.visitor_slot_id)
            return this.errMessageUtilsTh.errVisitorSlotRunningIdNotFound;
        else if (!this.formatUtils.IsNumber(body.visitor_slot_id))
            return this.errMessageUtilsTh.errVisitorSlotRunningIdNotNumber;
        else if (!body.cartype_id)
            return this.errMessageUtilsTh.errVisitorCartypeIDNotfound;
        else if (!this.formatUtils.IsNumber(body.cartype_id))
            return this.errMessageUtilsTh.errVisitorCartypeIDNotNumber;
        else if (!body.cartype_name_contraction)
            return this.errMessageUtilsTh.errVisitorCartypeNameContractionNotFound;
        else if (this.formatUtils.HaveSpecialFormat(body.cartype_name_contraction))
            return this.errMessageUtilsTh.errVisitorCartypeNameContractionProhibitSpecial;
        else if (!body.cartype_name_th)
            return this.errMessageUtilsTh.errVisitorCartypeNameThNotFound;
        else if (this.formatUtils.HaveSpecialFormat(body.cartype_name_th))
            return this.errMessageUtilsTh.errVisitorCartypeNameThProhibitSpecial;
        else if (!body.cartype_name_en)
            return this.errMessageUtilsTh.errVisitorCartypeNameEnNotFound;
        else if (this.formatUtils.HaveSpecialFormat(body.cartype_name_en)) {
            return this.errMessageUtilsTh.errVisitorCartypeNameEnProhibitSpecial;
        } return null;
    }
    
};

