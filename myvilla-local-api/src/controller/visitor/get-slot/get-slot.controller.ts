import { Body, Controller, Get } from '@nestjs/common';
import { GetSlotService } from './get-slot.service';

@Controller('bannayuu/api/visitor/get-slot')
export class GetSlotController {
    constructor(private readonly getSlotService:GetSlotService){}
    @Get('get')
    getSlotNotUse(@Body() body){
        return this.getSlotService.getSlotNotUse(body)
    }

    @Get('getbyslotnumber')
    getSlotNotUseById(@Body() body){
        return this.getSlotService.getSlotNotUseById(body)
    }
}
