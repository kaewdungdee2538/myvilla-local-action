import {HttpModule, Module } from '@nestjs/common';
import { BypassController } from './bypass.controller';
import { BypassService } from './bypass.service';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { LoadSettingLocalUtils } from 'src/utils/load_setting_local.utils';
import { dbConnection } from 'src/pg_database/pg.database';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { bGetBookingOutInfoMiddleware } from 'src/middleware/booking/get-booking-out-info/b_get_booking_out_info.middleware';
import { BActionOutMiddleware } from 'src/middleware/booking/action-out/b_action_out.middleware';
import { VsActionInCheckEmployeeMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_check_employee.middleware';
import { vsActionOutVerifyEstampMiddleware } from 'src/middleware/visitor/action-out/estamp-verify/vs_action_out_estamp_verify.middleware';

@Module({
  imports:[
    HttpModule
  ],
  controllers: [BypassController],
  providers: [
    BypassService
    ,bGetBookingOutInfoMiddleware
    ,BActionOutMiddleware
    ,StatusException
    ,ErrMessageUtilsTH
    ,LoadSettingLocalUtils
    ,dbConnection
    ,FormatDataUtils
    ,VsActionInCheckEmployeeMiddleWare
    ,vsActionOutVerifyEstampMiddleware
  ]
})
export class BypassModule {}
