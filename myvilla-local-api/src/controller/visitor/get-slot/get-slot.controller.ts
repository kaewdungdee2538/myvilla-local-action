import { Body, Controller, Get,Post } from '@nestjs/common';
import { GetSlotService } from './get-slot.service';

@Controller('bannayuu/api/visitor/get-slot')
export class GetSlotController {
    constructor(private readonly getSlotService:GetSlotService){}
    @Post('get')
    getSlotNotUse(@Body() body){
        return this.getSlotService.getSlotNotUse(body)
    }

    @Post('getall')
    getSlotNotUseAll(@Body() body){
        return this.getSlotService.getSlotNotUseAll(body)
    }

    @Post('getbyslotnumber')
    getSlotNotUseById(@Body() body){
        return this.getSlotService.getSlotNotUseById(body)
    }
}
