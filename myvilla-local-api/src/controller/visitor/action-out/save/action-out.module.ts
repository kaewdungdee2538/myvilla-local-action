import { Module } from '@nestjs/common';
import { ActionOutSaveController } from './action-out.controller';
import { ActionOutSaveService } from './action-out.service';

@Module({
  controllers: [ActionOutSaveController],
  providers: [ActionOutSaveService]
})
export class ActionOutSaveModule {}
