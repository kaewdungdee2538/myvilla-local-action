import { MiddlewareConsumer } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { VsActionInSaveMiddleware } from 'src/middleware/visitor/action-in/vs_action_in_save.middleware';
import { VsActionInInfoMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_info.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { ActionInController } from './action-in.controller';
import { ActionInService } from './action-in.service';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Module({
  imports:[dbConnection],
  controllers: [ActionInController],
  providers: [ActionInService,dbConnection,FormatDataUtils,ErrMessageUtilsTH]
})
export class ActionInModule {
  // configure(consumer:MiddlewareConsumer){
  //   consumer
  //   .apply(VsActionInSaveMiddleware,VsActionInInfoMiddleWare)
  //   .forRoutes('action-in/*');
  // }
}
