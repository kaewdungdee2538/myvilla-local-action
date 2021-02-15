import { MiddlewareConsumer, Module } from '@nestjs/common';
import { vsGetHomeMiddleware } from 'src/middleware/visitor/get-home/vs_get_home.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { VisitorPendantController } from './visitor-pendant.controller';
import { VisitorPendantService } from './visitor-pendant.service';

@Module({
  controllers: [VisitorPendantController],
  providers: [VisitorPendantService,dbConnection,FormatDataUtils,ErrMessageUtilsTH]
})
export class VisitorPendantModule {
  configure(consumer:MiddlewareConsumer){
    consumer
    .apply(vsGetHomeMiddleware)
    .forRoutes('bannayuu/api/visitor/visitor-pendant/*');
  }
}
