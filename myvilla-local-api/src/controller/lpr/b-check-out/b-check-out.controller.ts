import { Body, Controller, Post, UseGuards,Request } from '@nestjs/common';
import { LPRBCheckOutService } from './b-check-out.service';
import {BasicAuthenInterceptor} from 'src/interceptor/auth/basic-auth.interceptor'

@Controller('bannayuu/api/lpr/booking/check-out')
export class LPRBCheckOutController {
    constructor(private readonly bCheckOutService:LPRBCheckOutService){}

    @Post('get')
    getBookingOutWithLPR(@Body() body,@Request() req){
        return this.bCheckOutService.getBookingOutWithLPR(body,req);
    }

}
