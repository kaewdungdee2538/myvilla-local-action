import { Body, Controller, Get,Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetSlipService } from './get-slip.service';

@Controller('bannayuu/api/visitor/get-slip')
export class GetSlipController {
    constructor(private readonly getslipService:GetSlipService){}

    @Post('slipin')
    @UseGuards(JwtAuthGuard)
    getSlipIn(@Body() body){
        return this.getslipService.getSlipInInfo(body);
    }
}
