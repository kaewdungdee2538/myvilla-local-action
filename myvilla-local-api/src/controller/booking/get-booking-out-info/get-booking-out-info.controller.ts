import { Body, Controller, Get,Post, GoneException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetBookingOutInfoService } from './get-booking-out-info.service';

@Controller('bannayuu/api/booking/get-booking-out-info')
export class GetBookingOutInfoController {
    constructor(private readonly getBookingOutInfoService:GetBookingOutInfoService){}
   
    @Post('getout')
    @UseGuards(JwtAuthGuard)
    getBookingOutInfo(@Body() body){
        return this.getBookingOutInfoService.getBookingOutInfo(body);
    }
}
