import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
import { Observable } from 'rxjs';
import { dbConnection } from 'src/pg_database/pg.database';
export declare class DefaultInterceptor implements NestInterceptor {
    private readonly errMessageUrilTh;
    private readonly formatDataUtils;
    private readonly dbconnection;
    constructor(errMessageUrilTh: ErrMessageUtilsTH, formatDataUtils: FormatDataUtils, dbconnection: dbConnection);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
    checkInputValues(request: any): Promise<any>;
    CheckCompanyInBase(body: any): Promise<any>;
}
