import { MiddlewareConsumer, Module } from '@nestjs/common';
import { vsDefaultMiddleware } from 'src/middleware/default/default.middleware';
import { SosGetInfoById } from 'src/middleware/sos/sos-get-by-id.middleware';
import { SosSaveGetInfoById } from 'src/middleware/sos/sos-save-receive.middleware';
import { UserGetMiddleware } from 'src/middleware/user/user-get.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { SosController } from './sos.controller';
import { SosService } from './sos.service';

@Module({
  controllers: [SosController],
  providers: [
    SosService
    ,dbConnection
    ,ErrMessageUtilsTH
    ,FormatDataUtils
  ]
})
export class SosModule {
  configure(consumer:MiddlewareConsumer){
    consumer
    .apply(vsDefaultMiddleware)
    .forRoutes('bannayuu/api/sos/*');
    consumer
    .apply(SosGetInfoById)
    .forRoutes('bannayuu/api/sos/get-by-id');
    consumer
      .apply(SosSaveGetInfoById,UserGetMiddleware)
      .forRoutes('bannayuu/api/sos/corporate-receive');
  }
}
