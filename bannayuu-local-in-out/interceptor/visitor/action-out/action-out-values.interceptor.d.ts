import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
import { Observable } from 'rxjs';
export declare class ActionOutValuesInterceptor implements NestInterceptor {
    private readonly errMessageUrilTh;
    private readonly formatDataUtils;
    constructor(errMessageUrilTh: ErrMessageUtilsTH, formatDataUtils: FormatDataUtils);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
    checkInputValues(request: any): Promise<string>;
}
