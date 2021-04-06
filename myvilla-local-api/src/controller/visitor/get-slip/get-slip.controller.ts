import { Body, Controller, Get,Post } from '@nestjs/common';
import { GetSlipService } from './get-slip.service';

@Controller('bannayuu/api/visitor/get-slip')
export class GetSlipController {
    constructor(private readonly getslipService:GetSlipService){}

    @Post('slipin')
    getSlipIn(@Body() body){
        return this.getslipService.getSlipInInfo(body);
    }
}
