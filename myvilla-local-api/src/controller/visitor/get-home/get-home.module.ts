import { MiddlewareConsumer, Module } from '@nestjs/common';
import { vsGetHomeMiddleware } from 'src/middleware/visitor/get-home/vs_get_home.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { GetHomeController } from './get-home.controller';
import { GetHomeService } from './get-home.service';

@Module({
  controllers: [GetHomeController],
  providers: [GetHomeService
    ,dbConnection
    ,ErrMessageUtilsTH
    ,FormatDataUtils
    ]
})
export class GetHomeModule {
  configure(consumer:MiddlewareConsumer){
    consumer
    .apply(vsGetHomeMiddleware)
    .forRoutes('bannayuu/api/visitor/get-home/*');
  }
}
