import { Injectable } from "@nestjs/common";
import { throwIfEmpty } from "rxjs/operators";
import { dbConnection } from "src/pg_database/pg.database";
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";

@Injectable()
export class BActionOutMiddleware {
    constructor(
        private readonly formatUtils: FormatDataUtils,
        private readonly errMessageUtilsTh: ErrMessageUtilsTH,
        private readonly dbconnecttion: dbConnection
    ) { }

    async CheckSaveIn(body: any) {
        const checkvalues = this.checkValues(body);
        if (checkvalues)
            return checkvalues;
        return await this.checkValuesTBVCode(body)
    }

    checkValues(body: any) {
        // if (!body.visitor_record_id)
        //     return this.errMessageUtilsTh.errVisitorRecordIDNotFound
        // else if (this.formatUtils.HaveSpecialFormat(body.visitor_record_id))
        //     return this.errMessageUtilsTh.errVisitorRecordIdProhibitSpecial
        // else if (!this.formatUtils.IsNumber(body.visitor_record_id))
        //     return this.errMessageUtilsTh.errVisitorRecordIdNotNumber
        if (!body.company_id)
            return this.errMessageUtilsTh.errCompanyIDNotFound
        else if (this.formatUtils.HaveSpecialFormat(body.company_id))
            return this.errMessageUtilsTh.errCompanyIDProhibitSpecial
        else if (!this.formatUtils.IsNumber(body.company_id))
            return this.errMessageUtilsTh.errCompanyIDNotNumber
        else if (this.formatUtils.HaveSpecialFormat(body.company_code))
            return this.errMessageUtilsTh.errCompanyCodeProhibitSpecial
        else if (!body.guardhouse_out_id)
            return this.errMessageUtilsTh.errGuardHouseIDNotFound
        else if (this.formatUtils.HaveSpecialFormat(body.guardhouse_out_id))
            return this.errMessageUtilsTh.errGuardHouseIDProhibitSpecial
        else if (!this.formatUtils.IsNumber(body.guardhouse_out_id))
            return this.errMessageUtilsTh.errGuardHouseIDNotNumber
        else if (this.formatUtils.HaveSpecialFormat(body.guardhouse_out_code))
            return this.errMessageUtilsTh.errGuardHouseCodeProhibitSpecial
        else if (!body.employee_out_id)
            return this.errMessageUtilsTh.errEmployeeIDNotFound
        else if (this.formatUtils.HaveSpecialFormat(body.employee_out_id))
            return this.errMessageUtilsTh.errEmployeeIDProhibitSpecail
        else if (!this.formatUtils.IsNumber(body.employee_out_id))
            return this.errMessageUtilsTh.errEmployeeIDNotNumber
        return null;
    }

    async checkValuesTBVCode(body: any) {
        if (!body.tbv_code)
            return this.errMessageUtilsTh.errฺBookingTbvCodeNotFound
        else if (this.formatUtils.HaveSpecialFormat(body.tbv_code))
            return this.errMessageUtilsTh.errฺBookingTbvCodeProhibitSpecial
        const TbvCodeInBase = await this.checkTbvCodeInbase(body)
        console.log(TbvCodeInBase)
        if (TbvCodeInBase) {
            if (!TbvCodeInBase.visitor_record_code)
                return this.errMessageUtilsTh.errBookingQRCodeNotIn
        } else return this.errMessageUtilsTh.errBookingQRNotFound
        return null;
    }

    async checkTbvCodeInbase(body: any) {
        const company_id = body.company_id;
        const tbv_code = body.tbv_code;

        let sql = `select tbv.tbv_code,tvr.visitor_record_code
        from 
        t_booking_visitor tbv
        left join t_visitor_record  tvr on tbv.tbv_code = tvr.tbv_code
        where tbv.delete_flag = 'N'
        and tbv.company_id = $1
        and tbv.tbv_code = $2
        limit 1
        ;`
        const query = {
            text: sql
            , values: [company_id, tbv_code]
        }
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error) {
            console.log(res.error);
            return null;
        } else if (res.result.length === 0) {
            console.log('Booking No data');
            return null;
        }
        return res.result[0];

    }
}