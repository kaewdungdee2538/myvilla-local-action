import { Injectable, NestMiddleware } from '@nestjs/common';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { Request, Response, NextFunction } from 'express';
import { CardManageService } from 'src/middleware/card-manage/card-manage.service';
import { SlotManageService } from 'src/middleware/slot-manage/slot-manage.service';

@Injectable()
export class VsActionOutSlotOrCardMiddleWare {
  constructor(
    private readonly formatUtils: FormatDataUtils,
    private readonly errMessageUtilsTh: ErrMessageUtilsTH,
    private readonly slotManageService: SlotManageService,
    private readonly cardManageService: CardManageService,
  ) {}

  async CheckVisitorOut(body: any) {
    return await this.checkSlotOrCard(body);
  }
  async checkSlotOrCard(body: any) {
    if (body.visitor_slot_number === 'null') body.visitor_slot_number = null;
    if (body.card_code === 'null') body.card_code = null;
    if (body.card_name === 'null') body.card_name = null;
    if (
      (body.visitor_slot_number && (body.card_code || body.card_name)) ||
      (!body.visitor_slot_number && !body.card_code && !body.card_name)
    )
      return this.errMessageUtilsTh.errGetCardOrSlotNumberVisitor;
    else if (body.visitor_slot_number) {
      if (this.formatUtils.HaveSpecialFormat(body.visitor_slot_number))
        return this.errMessageUtilsTh
          .errGetSlotVisitorNumberSlotNumberProhibitSpecial;
      else if (!this.formatUtils.IsNumber(body.visitor_slot_number))
        return this.errMessageUtilsTh
          .errGetSlotVisitorNumberSlotNumberNotNumber;
      const getSlotInBase = await this.slotManageService.getSlotNumberInDataBase(
        {
          company_id: body.company_id,
          visitor_slot_number: body.visitor_slot_number,
        },
      );
      if (!getSlotInBase)
        return this.errMessageUtilsTh.errGetSlotVisitorNumberNotInDataBase;
      const getslotCheckIn = await this.slotManageService.getSlotNumberCheckIn({
        company_id: body.company_id,
        visitor_slot_number: body.visitor_slot_number,
      });
      if (!getslotCheckIn)
        return this.errMessageUtilsTh.errGetSlotVisitorNumberIsNotCheckIn;
      return null;
    } else if (body.card_code && body.card_name)
      return this.errMessageUtilsTh.errGetHaveCardCodeAndCardName;
    else if (body.card_code || body.card_name) {
      if (body.card_code) {
        if (this.formatUtils.HaveSpecialFormat(body.card_code))
          return this.errMessageUtilsTh.errGetCardProhibitSpecial;
        else if (!this.formatUtils.IsNumber(body.card_code))
          return this.errMessageUtilsTh.errGetCardNotNumber;
      } else {
        if (this.formatUtils.HaveSpecialFormat(body.card_name))
          return this.errMessageUtilsTh.errGetCardProhibitSpecial;
        else if (!this.formatUtils.IsNumber(body.card_name))
          return this.errMessageUtilsTh.errGetCardNotNumber;
      }
      const inputObj = {
        company_id: body.company_id,
        card_code: !body.card_code ? '' : body.card_code,
        card_name: !body.card_name ? '' : body.card_name,
      };
      console.log(inputObj);
      const cardInbase = await this.cardManageService.getCardInDataBase(
        inputObj,
      );
      if (!cardInbase) return this.errMessageUtilsTh.errGetCardNotInDatabase;
      const cardCheckIn = await this.cardManageService.getCardCheckIn(inputObj);
      if (!cardCheckIn) return this.errMessageUtilsTh.errGetCardIsNotCheckIn;
      return null;
    }
  }

  async CheckCalculateLog(body: any) {
    return await this.checkCalLog(body);
  }
  async checkCalLog(body: any) {
    if (body.tcpl_id && !this.formatUtils.IsNumber(body.tcpl_id))
      return this.errMessageUtilsTh.errTcplIdNotFound;
    else if ( body.tcpl_id &&
      this.formatUtils.IsNumber(body.tcpl_id) &&
      body.tcpl_id != 0  && !body.tcpl_code)
      return this.errMessageUtilsTh.errTcplCodeNotFound;
    else if (
      body.tcpl_id &&
      this.formatUtils.IsNumber(body.tcpl_id) &&
      body.tcpl_id != 0 &&
      body.tcpl_code.length == 0
    )
      return this.errMessageUtilsTh.errTcplCodeNotFound;
    else if (
      body.tcpl_id &&
      this.formatUtils.IsNumber(body.tcpl_id) &&
      body.tcpl_id != 0 &&
      this.formatUtils.HaveSpecialFormat(body.tcpl_code)
    )
      return this.errMessageUtilsTh.errTcplCodeProhibitSpecial;
    else if (
      body.tcpl_id &&
      this.formatUtils.IsNumber(body.tcpl_id) &&
      body.tcpl_id != 0 &&
      !this.formatUtils.HaveSpecialFormat(body.tcpl_code)
    ) {
      const error = await this.cardManageService.getCalculateLogInDataBase(
        body.tcpl_id,
        body.tcpl_code,
        body.company_id,
        body.visitor_slot_number,
        body.card_code,
        body.payment_type_id,
      );
      if (error) return error;
    }
    return null;
  }

  async CheckPaymentTypeId(body: any) {
    return await this.checkPaymentType(body);
  }
  async checkPaymentType(body: any) {
    if (
      body.payment_type_id &&
      !this.formatUtils.IsNumber(body.payment_type_id)
    )
      return this.errMessageUtilsTh.errPaymentTypeIdNotNumber;
    else if (
      body.payment_type_id &&
      this.formatUtils.IsNumber(body.payment_type_id)
    ) {
      const success = await this.cardManageService.getPaymentTypeId(
        body.payment_type_id,
      );
      if (!success) return this.errMessageUtilsTh.errPaymentTypeIdNotInBase;
    }
    return null;
  }
}
