import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
import { Observable } from 'rxjs';
import { StatusException } from 'src/utils/callback.status';
import { dbConnection } from 'src/pg_database/pg.database';
import * as moment from 'moment';

@Injectable()
export class DefaultInterceptor implements NestInterceptor {
    constructor(
        private readonly errMessageUrilTh: ErrMessageUtilsTH,
        private readonly formatDataUtils: FormatDataUtils,
        private readonly dbconnection: dbConnection,
    ) { }
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
       
        const errMessage = await this.checkInputValues(request);
        if (errMessage) throw new StatusException(
            {
                error: errMessage
                , result: null
                , message: errMessage
                , statusCode: 200
            }, 200)
        else return next.handle();

    }


    async checkInputValues(request: any) {
        const body = request.body;
        const file = request.files
        console.log(body)
         if(!body.company_id)
            return this.errMessageUrilTh.errCompanyIDNotFound;
        else if(this.formatDataUtils.HaveSpecialFormat(body.company_id))
            return this.errMessageUrilTh.errCompanyIDProhibitSpecial;
        else if(!this.formatDataUtils.IsNumber(body.company_id))
            return this.errMessageUrilTh.errCompanyIDNotNumber;
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