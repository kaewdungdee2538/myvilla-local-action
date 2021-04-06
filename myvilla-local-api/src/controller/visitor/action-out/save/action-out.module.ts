import { Module } from '@nestjs/common';
import { CardManageService } from 'src/middleware/card-manage/card-manage.service';
import { SlotManageService } from 'src/middleware/slot-manage/slot-manage.service';
import { VsActionInCheckEmployeeMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_check_employee.middleware';
import { vsActionOutVerifyEstampMiddleware } from 'src/middleware/visitor/action-out/estamp-verify/vs_action_out_estamp_verify.middleware';
import { VsActionOutForSaveMiddleWare } from 'src/middleware/visitor/action-out/save/vs_action_out_forsave.middleware';
import { VsActionOutSlotOrCardMiddleWare } from 'src/middleware/visitor/action-out/save/vs_action_out_slotorcard.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { LoadSettingLocalUtils } from 'src/utils/load_setting_local.utils';

import { ActionOutSaveController } from './action-out.controller';
import { ActionOutSaveService } from './action-out.service';

@Module({
  imports:[],
  controllers: [ActionOutSaveController],
  providers: [
    ActionOutSaveService
    ,FormatDataUtils
    ,ErrMessageUtilsTH
    ,dbConnection
    ,VsActionOutSlotOrCardMiddleWare
    ,VsActionOutForSaveMiddleWare
    ,CardManageService
    ,SlotManageService
    ,VsActionInCheckEmployeeMiddleWare
    ,LoadSettingLocalUtils
    ,vsActionOutVerifyEstampMiddleware
  ]
})
export class ActionOutSaveModule {}
