import { HttpService, MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { getImageManualMiddleware } from 'src/middleware/image_manual/get-image-manual/get-image-manual.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { GetImageController } from './get-image.controller';
import { GetImageService } from './get-image.service';

@Module({
  controllers: [GetImageController],
  providers: [
      GetImageService
      ,dbConnection
      ,ErrMessageUtilsTH
      ,FormatDataUtils
      ,JwtStrategy
    ]
})
export class GetImageModule {
    configure(consumer:MiddlewareConsumer){
        consumer
        .apply(getImageManualMiddleware)
        .forRoutes('bannayuu/api/manual/get-image/*');
      }
}
