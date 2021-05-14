import { Module } from '@nestjs/common';
import { CalTimediffController } from './cal-timediff.controller';
import { CalTimediffService } from './cal-timediff.service';

@Module({
  controllers: [CalTimediffController],
  providers: [CalTimediffService]
})
export class CalTimediffModule {}
