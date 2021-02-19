import { Body, Controller, Get, GoneException } from '@nestjs/common';
import { GetBookingOutInfoService } from './get-booking-out-info.service';

@Controller('bannayuu/api/booking/get-booking-out-info')
export class GetBookingOutInfoController {
    constructor(private readonly getBookingOutInfoService:GetBookingOutInfoService){}
    @Get('getout')
    getBookingOutInfo(@Body() body){
        return this.getBookingOutInfoService.getBookingOutInfo(body);
    }
}
