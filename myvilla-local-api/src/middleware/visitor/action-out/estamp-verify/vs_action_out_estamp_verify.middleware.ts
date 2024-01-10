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
            let sql = `
            SELECT
                CASE WHEN estamp_flag = 'Y' THEN true ELSE false END AS estamp_flag
                ,tvr.cartype_id
                ,mcc.cartype_category_id
                ,COALESCE(CAST(mcc.cartype_category_info->>'ignore_estamp' AS BOOLEAN),false) AS ignore_estamp
            FROM t_visitor_record tvr
            LEFT JOIN m_cartype_category mcc ON tvr.cartype_category_id = mcc.cartype_category_id
            WHERE action_out_flag = 'N' 
            AND tvr.company_id = $1 
            AND visitor_record_code = func_getvs_uuid_card_or_slot($1,$2,$3,$4);`
            const query = {
                text: sql
                , values: [company_id, card_code, card_name, visitor_slot_number]
            }

            const result = await this.dbconnecttion.getPgData(query);
            if (result.error || result.result.length === 0) return this.errMessageUrilTh.errVisitorNotIn;
            else if (!result.result[0].ignore_estamp && !result.result[0].estamp_flag)
                return this.errMessageUrilTh.errVisitorNotVerifyEstamp;
            else return null;
        }
        return null;
    }
}