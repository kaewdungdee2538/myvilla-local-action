import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
import { Request } from 'express-serve-static-core'
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { StatusException } from 'src/utils/callback.status';
import { dbConnection } from 'src/pg_database/pg.database';

@Injectable()
export class EstampSaveMiddleware implements NestInterceptor {
    constructor(
        private readonly errMessageUrilTh: ErrMessageUtilsTH,
        private readonly formatDataUtils: FormatDataUtils,
        private readonly dbconnecttion: dbConnection,
    ) { }
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        console.log(request.files)
        const errMessage = await this.checkInputValues(request);
        if (errMessage) throw new StatusException(
            {
                error: errMessage
                , result: null
                , message: this.errMessageUrilTh.messageProcessFail
                , statusCode: 200
            }, 200)
        else return next.handle();
        
    }


    async checkInputValues(request: any) {
        const body = request.body;
        // const file = request.files
        // if(!file.image_customer)
        //     return this.errMessageUrilTh.errImageCustomerNotFound;
        // else 
        if (!body.visitor_record_id)
            return this.errMessageUrilTh.errVisitorRecordIDNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.visitor_record_id))
            return this.errMessageUrilTh.errVisitorRecordIdProhibitSpecial;
        else if (!this.formatDataUtils.IsNumber(body.visitor_record_id))
            return this.errMessageUrilTh.errVisitorRecordIdNotNumber;
        // else if (!body.visitor_record_code)
        //     return this.errMessageUrilTh.errVisitorRecord_CodeNotFound;
        // else if (this.formatDataUtils.HaveSpecialFormat(body.visitor_record_code))
        //     return this.errMessageUrilTh.errVisitorRecord_CodeProhibit;
        else if (!body.employee_id)
            return this.errMessageUrilTh.errEmployeeIDNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.employee_id))
            return this.errMessageUrilTh.errEmployeeIDProhibitSpecail;
        else if (!this.formatDataUtils.IsNumber(body.employee_id))
            return this.errMessageUrilTh.errEmployeeIDNotNumber;
        else if (!body.guardhouse_id)
            return this.errMessageUrilTh.errGuardHouseIDNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.guardhouse_id))
            return this.errMessageUrilTh.errGuardHouseIDProhibitSpecial;
        else if (!this.formatDataUtils.IsNumber(body.guardhouse_id))
            return this.errMessageUrilTh.errGuardHouseIDNotNumber;
       
        const checkVisitorIn = await this.checkVisitorRecord(body);
        if(checkVisitorIn)
            return checkVisitorIn;
        const checkEmployee = await this.checkEmployee(body);
        return checkEmployee
    }
    async checkVisitorRecord(body:any){
        const visitor_record_id = body.visitor_record_id;
        const company_id = body.company_id;
        let sql = `select visitor_record_id from t_visitor_record
        where visitor_record_id = $1 and company_id = $2 and action_out_flag = 'N';`
        const query = {
            text:sql
            ,values:[visitor_record_id,company_id]
        }
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error)
            return res.error
        else if (res.result.length === 0)
            return this.errMessageUrilTh.errVisitorNotIn;
        else return null;
    }
    async checkEmployee(body: any) {
        const employee_id = body.employee_id;
        const company_id = body.company_id;
        let sql = `select employee_id from m_employee where delete_flag = 'N' and employee_id = $1 and company_id = $2;`
        const query = {
            text: sql
            , values: [employee_id, company_id]
        }
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error)
            return res.error
        else if (res.result.length === 0)
            return this.errMessageUrilTh.errEmployeeIDNotInDatabase;
        else return null;
    }
}