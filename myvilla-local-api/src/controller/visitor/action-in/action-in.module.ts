import { MiddlewareConsumer, UseInterceptors } from '@nestjs/common';
import { HttpService, Module, HttpModule } from '@nestjs/common';
import { VsActionInSaveMiddleware } from 'src/middleware/visitor/action-in/vs_action_in_save.middleware';
import { VsActionInInfoMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_info.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { ActionInController } from './action-in.controller';
import { ActionInService } from './action-in.service';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { VsActionInCheckSlotMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_checkslot.middleware';
import { VsActionInCheckHomeIDMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_checkhomeid.middleware';
import { VsActionInCheckEmployeeMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_check_employee.middleware';
import { LoadSettingLocalUtils } from 'src/utils/load_setting_local.utils';

@Module({
  imports: [dbConnection, HttpModule],
  controllers: [ActionInController],
  providers: [
    ActionInService,
    dbConnection,
    FormatDataUtils,
    ErrMessageUtilsTH,
    VsActionInCheckSlotMiddleWare,
    VsActionInInfoMiddleWare,
    VsActionInSaveMiddleware,
    VsActionInCheckHomeIDMiddleWare,
    VsActionInCheckEmployeeMiddleWare,
    LoadSettingLocalUtils,
  ],
})
export class ActionInModule {
  // configure(consumer:MiddlewareConsumer){
  //   consumer
  //   .apply(VsActionInSaveMiddleware,VsActionInInfoMiddleWare,VsActionInCheckSlotMiddleWare)
  //   .forRoutes('bannayuu/api/visitor/action/in/*');
  // }
}
