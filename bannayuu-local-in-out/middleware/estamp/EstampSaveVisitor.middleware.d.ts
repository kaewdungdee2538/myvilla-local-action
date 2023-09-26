import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
import { Observable } from 'rxjs';
import { dbConnection } from 'src/pg_database/pg.database';
export declare class EstampSaveVisitorMiddleware implements NestInterceptor {
    private readonly errMessageUrilTh;
    private readonly formatDataUtils;
    private readonly dbconnecttion;
    constructor(errMessageUrilTh: ErrMessageUtilsTH, formatDataUtils: FormatDataUtils, dbconnecttion: dbConnection);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
    checkInputValues(request: any): Promise<any>;
    checkVisitorRecord(body: any): Promise<any>;
    checkEmployee(body: any): Promise<any>;
    checkEstamp(body: any): Promise<any>;
}
