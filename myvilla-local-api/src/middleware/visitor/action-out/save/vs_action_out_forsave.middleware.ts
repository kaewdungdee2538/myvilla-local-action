import { Injectable, NestMiddleware } from '@nestjs/common';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { Request, Response, NextFunction } from 'express';
import { CardManageService } from 'src/middleware/card-manage/card-manage.service';

@Injectable()
export class VsActionOutForSaveMiddleWare {
  constructor(
    private readonly formatUtils: FormatDataUtils,
    private readonly errMessageUtilsTh: ErrMessageUtilsTH,
    private readonly cardManageService: CardManageService,
  ) {}

  async CheckVisitorOut(body: any) {
    return await this.checkVisitorValues(body);
  }
  async checkVisitorValues(body: any) {
    if (body.visitor_slot_number === 'null') body.visitor_slot_number = null;
    if (body.card_code === 'null') body.card_code = null;
    if (body.card_name === 'null') body.card_name = null;
    // if (!body.visitor_record_id)
    //     return this.errMessageUtilsTh.errVisitorSlotIdNotFound;
    // else if (this.formatUtils.HaveSpecialFormat(body.visitor_record_id))
    //     return this.errMessageUtilsTh.errVisitorSlotIdProhibitSpecial;
    // else if (!this.formatUtils.IsNumber(body.visitor_record_id))
    //     return this.errMessageUtilsTh.errVisitorSlotIdNotNumber;
    if (!body.company_id) return this.errMessageUtilsTh.errCompanyIDNotFound;
    else if (this.formatUtils.HaveSpecialFormat(body.company_id))
      return this.errMessageUtilsTh.errCompanyIDProhibitSpecial;
    else if (!this.formatUtils.IsNumber(body.company_id))
      return this.errMessageUtilsTh.errCompanyIDNotNumber;
    else if (this.formatUtils.HaveSpecialFormat(body.company_code))
      return this.errMessageUtilsTh.errCompanyCodeProhibitSpecial;
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
    else if (!body.pos_id) return this.errMessageUtilsTh.errPosIDNotFound;
    else if (this.formatUtils.HaveSpecialFormat(body.pos_id))
      return this.errMessageUtilsTh.errPosIDProhibitSpecial;
    
  }
}


