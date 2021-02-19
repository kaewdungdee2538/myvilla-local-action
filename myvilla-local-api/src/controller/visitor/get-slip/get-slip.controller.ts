import { Body, Controller, Get } from '@nestjs/common';
import { GetSlipService } from './get-slip.service';

@Controller('bannayuu/api/visitor/get-slip')
export class GetSlipController {
    constructor(private readonly getslipService:GetSlipService){}

    @Get('slipin')
    getSlipIn(@Body() body){
        return this.getslipService.getSlipInInfo(body);
    }
}
