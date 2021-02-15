import { Injectable, NestMiddleware } from "@nestjs/common";
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class VsActionOutForSaveMiddleWare {
    constructor(
        private readonly formatUtils: FormatDataUtils,
        private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }

    CheckVisitorOut(body: any) {
        return this.checkVisitorValues(body);
    }
    checkVisitorValues(body: any) {
        // if (!body.visitor_record_id)
        //     return this.errMessageUtilsTh.errVisitorSlotIdNotFound;
        // else if (this.formatUtils.HaveSpecialFormat(body.visitor_record_id))
        //     return this.errMessageUtilsTh.errVisitorSlotIdProhibitSpecial;
        // else if (!this.formatUtils.IsNumber(body.visitor_record_id))
        //     return this.errMessageUtilsTh.errVisitorSlotIdNotNumber;
        if (!body.site_id)
            return this.errMessageUtilsTh.errSiteIDNotFound;
        else if (this.formatUtils.HaveSpecialFormat(body.site_id))
            return this.errMessageUtilsTh.errSiteIDProhibitSpecial;
        else if (!this.formatUtils.IsNumber(body.site_id))
            return this.errMessageUtilsTh.errSiteIDNotNumber;
        else if (this.formatUtils.HaveSpecialFormat(body.site_code))
            return this.errMessageUtilsTh.errSiteCodeProhibitSpecial;
        else if (!body.guardhouse_out_id)
            return this.errMessageUtilsTh.errGuardHouseIDNotFound;
        else if (this.formatUtils.HaveSpecialFormat(body.guardhouse_out_id))
            return this.errMessageUtilsTh.errGuardHouseIDProhibitSpecial;
        else if (!this.formatUtils.IsNumber(body.guardhouse_out_id))
            return this.errMessageUtilsTh.errGuardHouseIDNotNumber;
        else if (this.formatUtils.HaveSpecialFormat(body.guardhouse_out_code))
            return this.errMessageUtilsTh.errGuardHouseCodeProhibitSpecial;
        else if (!body.employee_out_id)
            return this.errMessageUtilsTh.errEmployeeIDNotFound;
        else if (this.formatUtils.HaveSpecialFormat(body.employee_out_id))
            return this.errMessageUtilsTh.errEmployeeIDProhibitSpecail;
        else if (!this.formatUtils.IsNumber(body.employee_out_id))
            return this.errMessageUtilsTh.errEmployeeIDNotNumber;
        else if (!body.employee_out_info)
            return this.errMessageUtilsTh.errEmployeeInfoNotFound;
        else if (!body.pos_id)
            return this.errMessageUtilsTh.errPosIDNotFound
        else if (this.formatUtils.HaveSpecialFormat(body.pos_id))
            return this.errMessageUtilsTh.errPosIDProhibitSpecial;
        return null;
    }
}