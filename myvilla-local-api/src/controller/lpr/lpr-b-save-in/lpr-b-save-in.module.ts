import { Module } from '@nestjs/common';
import { BActionInInterceptor } from 'src/interceptor/booking/action-in/b-action-in.interceptor';
import { BActionInMiddleware } from 'src/middleware/booking/action-in/b_action_in.middleware';
import { VsActionInCheckHomeIDMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_checkhomeid.middleware';
import { VsActionInCheckEmployeeMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_check_employee.middleware';
import { VsActionInInfoMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_info.middleware';
import { VsActionInSaveMiddleware } from 'src/middleware/visitor/action-in/vs_action_in_save.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { LoadSettingLocalUtils } from 'src/utils/load_setting_local.utils';
import { LptBSaveInController } from './lpr-b-save-in.controller';
import { LptBSaveInService } from './lpr-b-save-in.service';
import { LPRBookingCheckInMiddleware } from 'src/middleware/lpr/b-check-in/lpr_b_check_in.middleware';

@Module({
  controllers: [LptBSaveInController],
  providers: [
    LptBSaveInService
    ,dbConnection
    ,FormatDataUtils
    ,ErrMessageUtilsTH
    ,BActionInInterceptor
    ,BActionInMiddleware
    ,VsActionInInfoMiddleWare
    ,VsActionInSaveMiddleware
    ,VsActionInCheckHomeIDMiddleWare
    ,VsActionInCheckEmployeeMiddleWare
    ,LoadSettingLocalUtils
    ,LPRBookingCheckInMiddleware
  ]
})
export class LptBSaveInModule {
}
