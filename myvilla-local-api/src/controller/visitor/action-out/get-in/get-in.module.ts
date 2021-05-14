import { HttpModule, HttpService, MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constant';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { CalTimediffService } from 'src/controller/cal-timediff/cal-timediff.service';
import { RegistryImageModule } from 'src/controller/image/registry-image/registry-image.module';
import { RegistryImageService } from 'src/controller/image/registry-image/registry-image.service';
import { vsDefaultMiddleware } from 'src/middleware/default/default.middleware';
import { vsActionOutVerifyEstampMiddleware } from 'src/middleware/visitor/action-out/estamp-verify/vs_action_out_estamp_verify.middleware';
import { vsActionOutGetInMiddleware } from 'src/middleware/visitor/action-out/get-in/vs_action_out_get_in.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { LoadSettingLocalUtils } from 'src/utils/load_setting_local.utils';
import { GetInController } from './get-in.controller';
import { GetInService } from './get-in.service';

@Module({
  imports:[
    RegistryImageModule
    ,HttpModule
  ],
  controllers: [GetInController],
  providers: [
    GetInService
    ,dbConnection
    ,ErrMessageUtilsTH
    ,FormatDataUtils
    ,RegistryImageService
    ,LoadSettingLocalUtils
    ,CalTimediffService
  ],
})
export class GetInModule {
  configure(consumer:MiddlewareConsumer){
    consumer
    .apply(vsDefaultMiddleware,vsActionOutGetInMiddleware,vsActionOutVerifyEstampMiddleware)
    .forRoutes('bannayuu/api/visitor/action/out/get-in/*');
  }
}
