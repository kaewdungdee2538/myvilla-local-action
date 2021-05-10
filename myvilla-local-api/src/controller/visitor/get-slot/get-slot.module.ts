import { MiddlewareConsumer, Module } from '@nestjs/common';
import { vsDefaultMiddleware } from 'src/middleware/default/default.middleware';
import { VsGetSlotBySlotNumberMiddleware, VsGetSlotMiddleware } from 'src/middleware/visitor/get-slot/vs_get_slot.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { GetSlotController } from './get-slot.controller';
import { GetSlotService } from './get-slot.service';

@Module({
  imports:[dbConnection],
  controllers: [GetSlotController],
  providers:[GetSlotService,dbConnection,FormatDataUtils,ErrMessageUtilsTH]
})
export class GetSlotModule {
   configure(consumer:MiddlewareConsumer){
    consumer
    .apply(vsDefaultMiddleware,VsGetSlotMiddleware)
    .forRoutes('bannayuu/api/visitor/get-slot/*');
    consumer
    .apply(VsGetSlotMiddleware,VsGetSlotBySlotNumberMiddleware)
    .forRoutes('bannayuu/api/visitor/get-slot/getbyslotnumber');
  }
}
