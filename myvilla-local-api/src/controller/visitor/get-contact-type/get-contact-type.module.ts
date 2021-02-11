import { MiddlewareConsumer, Module } from '@nestjs/common';
import { vsGetHomeMiddleware } from 'src/middleware/visitor/get-home/vs_get_home.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { GetContactTypeController } from './get-contact-type.controller';
import { GetContactTypeService } from './get-contact-type.service';

@Module({
  controllers: [GetContactTypeController],
  providers: [
    GetContactTypeService
    ,dbConnection
    ,ErrMessageUtilsTH
    ,FormatDataUtils
  ]
})
export class GetContactTypeModule {
  configure(consumer:MiddlewareConsumer){
    consumer
    .apply(vsGetHomeMiddleware)
    .forRoutes('bannayuu/api/visitor/get-contact-type/*');
  }
}
