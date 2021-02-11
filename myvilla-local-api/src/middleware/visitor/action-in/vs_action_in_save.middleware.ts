import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class VsActionInSaveMiddleware {
    constructor(
        private readonly formatUtils: FormatDataUtils,
        private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }

    CheckSaveIn(body: any) {
        return this.checkValuesActionInSave(body)
    }



    checkValuesActionInSave(body: any) {
        // if (!body.visitor_slot_id)
        //     return this.errMessageUtilsTh.errVisitorSlotRunningIdNotFound;
        // else if (!this.formatUtils.IsNumber(body.visitor_slot_id))
        //     return this.errMessageUtilsTh.errVisitorSlotRunningIdNotNumber;
        if (!body.cartype_id)
            return this.errMessageUtilsTh.errVisitorCartypeIDNotfound;
        else if (this.formatUtils.HaveSpecialFormat(body.cartype_id))
            return this.errMessageUtilsTh.errVisitorCartypeIDProhibitSpecail
        else if (!this.formatUtils.IsNumber(body.cartype_id))
            return this.errMessageUtilsTh.errVisitorCartypeIDNotNumber;
        else if (!body.cartype_name_contraction)
            return this.errMessageUtilsTh.errVisitorCartypeNameContractionNotFound;
        else if (this.formatUtils.HaveSpecialFormat(body.cartype_name_contraction))
            return this.errMessageUtilsTh.errVisitorCartypeNameContractionProhibitSpecial;
        else if (!body.cartype_name_th)
            return this.errMessageUtilsTh.errVisitorCartypeNameThNotFound;
        else if (this.formatUtils.HaveSpecialFormat(body.cartype_name_th))
            return this.errMessageUtilsTh.errVisitorCartypeNameThProhibitSpecial;
        else if (!body.cartype_name_en)
            return this.errMessageUtilsTh.errVisitorCartypeNameEnNotFound;
        else if (this.formatUtils.HaveSpecialFormat(body.cartype_name_en))
            return this.errMessageUtilsTh.errVisitorCartypeNameEnProhibitSpecial;
        else if (!body.site_id)
            return this.errMessageUtilsTh.errSiteIDNotFound;
        else if (!this.formatUtils.IsNumber(body.site_id))
            return this.errMessageUtilsTh.errSiteIDNotNumber;
        else if (this.formatUtils.HaveSpecialFormat(body.site_id))
            return this.errMessageUtilsTh.errSiteIDProhibitSpecial;
        else if (this.formatUtils.HaveSpecialFormat(body.site_code))
            return this.errMessageUtilsTh.errSiteCodeProhibitSpecial;
        else if (!body.guardhouse_in_id)
            return this.errMessageUtilsTh.errGuardHouseIDNotFound;
        else if (!this.formatUtils.IsNumber(body.guardhouse_in_id))
            return this.errMessageUtilsTh.errGuardHouseIDNotNumber;
        else if (this.formatUtils.HaveSpecialFormat(body.guardhouse_in_id))
            return this.errMessageUtilsTh.errGuardHouseIDProhibitSpecial;
        else if (this.formatUtils.HaveSpecialFormat(body.guardhouse_in_code))
            return this.errMessageUtilsTh.errGuardHouseCodeProhibitSpecial;
        else if (!body.employee_in_id)
            return this.errMessageUtilsTh.errEmployeeIDNotFound;
        else if (this.formatUtils.HaveSpecialFormat(body.employee_in_id))
            return this.errMessageUtilsTh.errEmployeeIDProhibitSpecail;
        else if (!this.formatUtils.IsNumber(body.employee_in_id))
            return this.errMessageUtilsTh.errEmployeeIDNotNumber
        else if (!body.home_id)
            return this.errMessageUtilsTh.errHomeIDNotFound;
        else if (this.formatUtils.HaveSpecialFormat(body.home_id))
            return this.errMessageUtilsTh.errHomeIdProhibitSpecial;
        else if (!this.formatUtils.IsNumber(body.home_id))
            return this.errMessageUtilsTh.errHomeIDNotNumber;
        return null;
    }

};

