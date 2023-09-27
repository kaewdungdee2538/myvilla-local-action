import { Module } from '@nestjs/common';
import { BActionOutInterceptor } from 'src/interceptor/booking/actionout/b-action-out.interceptor';
import { BActionOutMiddleware } from 'src/middleware/booking/action-out/b_action_out.middleware';
import { bGetBookingOutInfoMiddleware } from 'src/middleware/booking/get-booking-out-info/b_get_booking_out_info.middleware';
import { VsActionInCheckEmployeeMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_check_employee.middleware';
import { VsActionOutSlotOrCardMiddleWare } from 'src/middleware/visitor/action-out/save/vs_action_out_slotorcard.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { LoadSettingLocalUtils } from 'src/utils/load_setting_local.utils';
import { BActionOutController } from './b-action-out.controller';
import { BActionOutService } from './b-action-out.service';
import { SlotManageService } from 'src/middleware/slot-manage/slot-manage.service';
import { CardManageService } from 'src/middleware/card-manage/card-manage.service';
import { GetSlipService } from 'src/controller/visitor/get-slip/get-slip.service';

@Module({
  controllers: [BActionOutController],
  providers: [
    BActionOutService
    ,dbConnection
    ,FormatDataUtils
    ,ErrMessageUtilsTH
    ,BActionOutMiddleware
    ,bGetBookingOutInfoMiddleware
    ,LoadSettingLocalUtils
    ,VsActionInCheckEmployeeMiddleWare
    ,VsActionOutSlotOrCardMiddleWare
    ,CardManageService
    ,SlotManageService
    ,GetSlipService
  ]
})
export class BActionOutModule {}
