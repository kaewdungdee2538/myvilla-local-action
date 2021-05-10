import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from 'express';
import { dbConnection } from "src/pg_database/pg.database";
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
import * as moment from 'moment';

@Injectable()
export class vsDefaultMiddleware implements NestMiddleware {
    constructor(
        private readonly errMessageUrilTh: ErrMessageUtilsTH,
        private readonly formatDataUtils: FormatDataUtils,
        private readonly dbconnection: dbConnection,
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
        return await this.CheckCompanyInBase(body);
    }

    async CheckCompanyInBase(body: any) {
        const company_id = body.company_id;
        let sql = `select company_id
        ,to_char(company_start_date,'YYYY-MM-DD HH24:MI:SS') as company_start_date 
        ,to_char(company_expire_date,'YYYY-MM-DD HH24:MI:SS') as company_expire_date
        from m_company where delete_flag = 'N' and company_id =$1;`
        const query = {
            text: sql
            , values: [company_id]
        }
        const res = await this.dbconnection.getPgData(query);
        if (res.error)
            return res.error
        else if (res.result.length === 0)
            return this.errMessageUrilTh.errCompanyNotInBase;
        else if (!res.result[0].company_start_date)
            return this.errMessageUrilTh.errCompanyStartDateNotFound;
        else if (!res.result[0].company_expire_date)
            return this.errMessageUrilTh.errCompanyExpireDateNotFound;
        else if (moment() < moment(res.result[0].company_start_date))
            return this.errMessageUrilTh.errCompanyNotStart;
        else if (moment() > moment(res.result[0].company_expire_date))
            return this.errMessageUrilTh.errCompanyIsExpire;
        else return null;
    }


}