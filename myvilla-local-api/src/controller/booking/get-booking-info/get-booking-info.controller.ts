import { Body, Controller, Get,Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetBookingInfoService } from './get-booking-info.service';

@Controller('bannayuu/api/booking/get-booking-info')
export class GetBookingInfoController {
    constructor(private readonly getBookingInfoService:GetBookingInfoService){}

    @Post('getinfo')
    @UseGuards(JwtAuthGuard)
    getBookingInfo(@Body() body){
        return this.getBookingInfoService.getBookingInfo(body);
    }
}
