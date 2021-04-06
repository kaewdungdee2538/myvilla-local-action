import { Body, Controller, Get,Post, GoneException } from '@nestjs/common';
import { GetBookingOutInfoService } from './get-booking-out-info.service';

@Controller('bannayuu/api/booking/get-booking-out-info')
export class GetBookingOutInfoController {
    constructor(private readonly getBookingOutInfoService:GetBookingOutInfoService){}
    @Post('getout')
    getBookingOutInfo(@Body() body){
        return this.getBookingOutInfoService.getBookingOutInfo(body);
    }
}
