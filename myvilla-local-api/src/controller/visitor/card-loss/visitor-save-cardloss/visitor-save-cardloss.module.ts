import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CardManageService } from 'src/middleware/card-manage/card-manage.service';
import { vsCardLossSaveMiddleware } from 'src/middleware/visitor/card-loss/save/vs_card_loss_save.middleware';
import { vsGetHomeMiddleware } from 'src/middleware/visitor/get-home/vs_get_home.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { VisitorSaveCardlossController } from './visitor-save-cardloss.controller';
import { VisitorSaveCardlossService } from './visitor-save-cardloss.service';

@Module({
  controllers: [VisitorSaveCardlossController],
  providers: [
    VisitorSaveCardlossService
    ,dbConnection
    ,FormatDataUtils
    ,ErrMessageUtilsTH
    ,vsCardLossSaveMiddleware
    ,CardManageService
  ]
})
export class VisitorSaveCardlossModule {
  // configure(consumer:MiddlewareConsumer){
  //   consumer
  //   .apply(vsGetHomeMiddleware)
  //   .forRoutes('bannayuu/api/visitor/cardloss/save-cardloss/*');
  // }
}
