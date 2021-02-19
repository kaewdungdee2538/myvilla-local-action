import { Body, Controller, Get } from '@nestjs/common';
import { GetBookingInfoService } from './get-booking-info.service';

@Controller('bannayuu/api/booking/get-booking-info')
export class GetBookingInfoController {
    constructor(private readonly getBookingInfoService:GetBookingInfoService){}

    @Get('getinfo')
    getBookingInfo(@Body() body){
        return this.getBookingInfoService.getBookingInfo(body);
    }
}
