import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';

@Injectable()
export class UserGetMiddleware implements NestMiddleware {
    constructor(
        private readonly errMessageUrilTh: ErrMessageUtilsTH,
        private readonly formatDataUtils: FormatDataUtils,
        private readonly dbconnection: dbConnection,
    ) { }
    async use(req: Request, res: Response, next: () => void) {
        const messageCheckvalue = await this.CheckValues(req.body)
        if (messageCheckvalue) {
            console.log('Middleware check get user : ' + messageCheckvalue)
            res.send({
                response: {
                    error: messageCheckvalue
                    , result: null
                    , message: messageCheckvalue
                    , statusCode: 200
                }
            });
        } else
            next();
    }

    async CheckValues(body: any) {
        if (!body.employee_id)
            return this.errMessageUrilTh.errEmployeeIDNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.employee_id))
            return this.errMessageUrilTh.errEmployeeIDProhibitSpecail
        else if (!this.formatDataUtils.IsNumber(body.employee_id))
            return this.errMessageUrilTh.errEmployeeIDNotNumber
        else return await this.checkEmployeeInBase(body);
    }

    async checkEmployeeInBase(body) {
        const company_id = body.company_id;
        const employee_id = body.employee_id;
        let sql = `select employee_id from m_employee
        where delete_flag = 'N' and company_id = $1 and employee_id = $2 ;`
        const query = {
            text: sql
            , values: [company_id, employee_id]
        }
        const res = await this.dbconnection.getPgData(query);
        if (res.error)
            return res.error
        else if (res.result.length === 0)
            return this.errMessageUrilTh.errEmployeeIDNotInDatabase;
        else return null;
    }

};

