import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { dbConnection } from "src/pg_database/pg.database";
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
import { LoadSettingLocalUtils } from "src/utils/load_setting_local.utils";
@Injectable()
export class vsActionOutVerifyEstampMiddleware implements NestMiddleware {
    constructor(
        private readonly errMessageUrilTh: ErrMessageUtilsTH,
        private readonly formatDataUtils: FormatDataUtils,
        private readonly localSettingLocalUtils: LoadSettingLocalUtils,
        private readonly dbconnecttion: dbConnection,
    ) { }
    async use(req: Request, res: Response, next: () => void) {
        console.log('estamp verify middleware')
        const messageCheckCartypeInfo = await this.checkValues(req.body);
        if (messageCheckCartypeInfo) {
            console.log('Middleware estamp verify : ' + messageCheckCartypeInfo)
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

    async checkValues(body:any) {
            return this.checkEstampVisitorOut(body);
    }
    async checkEstampVisitorOut(body:any) {
        console.log(body)
        const visitor_slot_number = body.visitor_slot_number
        const card_code = body.card_code
        const card_name = body.card_name
        const company_id = body.company_id

        if (await this.localSettingLocalUtils.getVisitorOutEstampMode(company_id)) {
            let sql = `select estamp_flag from t_visitor_record
            where action_out_flag = 'N' and company_id = $1 
            and visitor_record_code = func_getvs_uuid_card_or_slot($1,$2,$3,$4);`
            const query = {
                text: sql
                , values: [company_id, card_code, card_name, visitor_slot_number]
            }
            console.log(JSON.stringify(query))
            const result = await this.dbconnecttion.getPgData(query);
            if (result.error || result.result.length === 0) return this.errMessageUrilTh.errVisitorNotIn;
            else if (result.result[0].estamp_flag === 'N')
                return this.errMessageUrilTh.errVisitorNotVerifyEstamp;
            else return null;
        }
        return null;
    }
}