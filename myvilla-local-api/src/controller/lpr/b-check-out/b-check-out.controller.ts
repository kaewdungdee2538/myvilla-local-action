import { Body, Controller, Post, UseGuards,Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LPRBCheckOutService } from './b-check-out.service';

@Controller('bannayuu/api/lpr/booking/check-out')
export class LPRBCheckOutController {
    constructor(private readonly bCheckOutService:LPRBCheckOutService){}

    @Post('get')
    @UseGuards(JwtAuthGuard)
    getBookingOutWithLPR(@Body() body,@Request() req){
        return this.bCheckOutService.getBookingOutWithLPR(body,req);
    }

}
