import { Body, Controller,Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetBookingOutInfoService } from './get-booking-out-info.service';

@Controller('bannayuu/api/booking/get-booking-out-info')
export class GetBookingOutInfoController {
    constructor(private readonly getBookingOutInfoService:GetBookingOutInfoService){}
   
    @Post('getout')
    @UseGuards(JwtAuthGuard)
    getBookingOutInfo(@Body() body,@Request() req){
        return this.getBookingOutInfoService.getBookingOutInfo(body,req);
    }
}
