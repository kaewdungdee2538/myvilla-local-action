import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { dbConnection } from "src/pg_database/pg.database";
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
import { LoadSettingLocalUtils } from "src/utils/load_setting_local.utils";
@Injectable()
export class vsActionOutGetInMiddleware implements NestMiddleware {
    constructor(
        private readonly errMessageUrilTh: ErrMessageUtilsTH,
        private readonly formatDataUtils: FormatDataUtils,
        private readonly localSettingLocalUtils: LoadSettingLocalUtils,
        private readonly dbconnecttion: dbConnection,
    ) { }
    async use(req: Request, res: Response, next: () => void) {
        console.log('getin middleware')
        const messageCheckCartypeInfo = await this.checkValues(req);
        if (messageCheckCartypeInfo) {
            console.log('Middleware get in : ' + messageCheckCartypeInfo)
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

    async checkValues(req: Request) {
        const body = req.body;
        if (!body.company_id)
            return this.errMessageUrilTh.errGetCompanyIDNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.company_id))
            return this.errMessageUrilTh.errGetCompanyIDProhibitSpecial;
        else if (!this.formatDataUtils.IsNumber(body.company_id))
            return this.errMessageUrilTh.errGetCompanyIDNotNumber;
        return this.checkSlotOrCard(req);
    }

    async checkSlotOrCard(req: Request) {
        const body = req.body;
        if (body.visitor_slot_number && (body.card_code || body.card_name))
            return this.errMessageUrilTh.errGetCardOrSlotNumberVisitor;
        else if (!body.visitor_slot_number && (!body.card_code && !body.card_name))
            return this.errMessageUrilTh.errGetCardOrSlotNumberVisitor;
        else if (body.visitor_slot_number) {
            if (this.formatDataUtils.HaveSpecialFormat(body.visitor_slot_number))
                return this.errMessageUrilTh.errGetSlotVisitorNumberSlotNumberProhibitSpecial;
            else if (!this.formatDataUtils.IsNumber(body.visitor_slot_number))
                return this.errMessageUrilTh.errGetSlotVisitorNumberSlotNumberNotNumber;
        } else if (body.card_code && body.card_name)
            return this.errMessageUrilTh.errGetHaveCardCodeAndCardName;
        else if (body.card_code || body.card_name) {
            if (body.card_code) {
                if (this.formatDataUtils.HaveSpecialFormat(body.card_code))
                    return this.errMessageUrilTh.errGetCardProhibitSpecial;
                else if (!this.formatDataUtils.IsNumber(body.card_code))
                    return this.errMessageUrilTh.errGetCardNotNumber;
            } else {
                if (this.formatDataUtils.HaveSpecialFormat(body.card_name))
                    return this.errMessageUrilTh.errGetCardProhibitSpecial;
                else if (!this.formatDataUtils.IsNumber(body.card_name))
                    return this.errMessageUrilTh.errGetCardNotNumber;
            }

        }
        return null;
    }
}