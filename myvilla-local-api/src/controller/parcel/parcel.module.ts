import { Module } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { ParcelController } from './parcel.controller';
import { ParcelService } from './parcel.service';

@Module({
  controllers: [ParcelController],
  providers: [ParcelService,dbConnection, FormatDataUtils, ErrMessageUtilsTH]
})
export class ParcelModule {}
