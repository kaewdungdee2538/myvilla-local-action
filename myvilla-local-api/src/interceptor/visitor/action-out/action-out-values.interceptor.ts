import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
import { Observable } from 'rxjs';
import { StatusException } from 'src/utils/callback.status';

@Injectable()
export class ActionOutValuesInterceptor implements NestInterceptor {
    constructor(
        private readonly errMessageUrilTh: ErrMessageUtilsTH,
        private readonly formatDataUtils: FormatDataUtils
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
        // const file = request.files
        console.log(body)
        if (body.tcpl_id) {
            if (this.formatDataUtils.HaveSpecialFormat(body.tcpl_id))
                return this.errMessageUrilTh.errTcplProhitbitSpecial;
            else if (!this.formatDataUtils.IsNumber(body.tcpl_id))
                return this.errMessageUrilTh.errTcplNotNumber;
        }
        if (body.sum_parking_total_after_discount) {
            if (this.formatDataUtils.HaveSpecialFormat(body.sum_parking_total_after_discount))
                return this.errMessageUrilTh.errSumParkingProhitbitSpecial;
            else if (!this.formatDataUtils.IsNumber(body.sum_parking_total_after_discount))
                return this.errMessageUrilTh.errSumParkingNotNumber;
        }
        if (body.sum_overnight_fine_amount) {
            if (this.formatDataUtils.HaveSpecialFormat(body.sum_overnight_fine_amount))
                return this.errMessageUrilTh.errOverFineProhitbitSpecial;
            else if (!this.formatDataUtils.IsNumber(body.sum_overnight_fine_amount))
                return this.errMessageUrilTh.errOverFineNotNumber;
        }
        if (body.payment_type_id) {
            if (this.formatDataUtils.HaveSpecialFormat(body.payment_type_id))
                return this.errMessageUrilTh.errPaymentTypeIdProhitbitSpecial;
            else if (!this.formatDataUtils.IsNumber(body.payment_type_id))
                return this.errMessageUrilTh.errPaymentTypeIdNotNumber;
        }
        return null
    }
}
