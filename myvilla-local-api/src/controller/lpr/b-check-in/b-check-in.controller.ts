import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LPRBCheckInService } from './b-check-in.service';

@Controller('bannayuu/api/lpr/booking/check-in')
export class LPRBCheckInController {
    constructor(private readonly bCheckInService:LPRBCheckInService){}

    @Post('get')
    @UseGuards(JwtAuthGuard)
    getBookingWithLPR(@Body() body){
        return this.bCheckInService.getBookingWithLPR(body);
    }

}
