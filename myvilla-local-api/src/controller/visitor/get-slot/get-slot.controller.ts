import { Body, Controller, Get,Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetSlotService } from './get-slot.service';

@Controller('bannayuu/api/visitor/get-slot')
export class GetSlotController {
    constructor(private readonly getSlotService:GetSlotService){}
    
    @Post('get')
    @UseGuards(JwtAuthGuard)
    getSlotNotUse(@Body() body){
        return this.getSlotService.getSlotNotUse(body)
    }

    @Post('getall')
    @UseGuards(JwtAuthGuard)
    getSlotNotUseAll(@Body() body){
        return this.getSlotService.getSlotNotUseAll(body)
    }

    @Post('getbyslotnumber')
    @UseGuards(JwtAuthGuard)
    getSlotNotUseById(@Body() body){
        return this.getSlotService.getSlotNotUseById(body)
    }
}
