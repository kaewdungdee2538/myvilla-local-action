import { MiddlewareConsumer, Module } from '@nestjs/common';
import { vsDefaultMiddleware } from 'src/middleware/default/default.middleware';
import { EstampGetVisitorInfoMiddleware } from 'src/middleware/estamp/EstampGetVisitorInfo.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { VsEstampController } from './vs-estamp.controller';
import { VsEstampService } from './vs-estamp.service';

@Module({
  controllers: [VsEstampController],
  providers: [
    VsEstampService
    ,dbConnection
    ,ErrMessageUtilsTH
    ,FormatDataUtils]
})
export class VsEstampModule {
  configure(consumer:MiddlewareConsumer){
    consumer
    .apply(vsDefaultMiddleware,EstampGetVisitorInfoMiddleware)
    .forRoutes('bannayuu/api/visitor/estamp/get-visitorinfo');
    
  }
}
