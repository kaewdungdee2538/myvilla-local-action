import { Module } from '@nestjs/common';
import { CardManageService } from 'src/middleware/card-manage/card-manage.service';
import { SlotManageService } from 'src/middleware/slot-manage/slot-manage.service';
import { VsActionOutForSaveMiddleWare } from 'src/middleware/visitor/action-out/save/vs_action_out_forsave.middleware';
import { VsActionOutSlotOrCardMiddleWare } from 'src/middleware/visitor/action-out/save/vs_action_out_slotorcard.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';

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
  ]
})
export class ActionOutSaveModule {}
