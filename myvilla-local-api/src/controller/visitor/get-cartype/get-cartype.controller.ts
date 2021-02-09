import { Body, Controller, Get } from '@nestjs/common';
import { GetCartypeService } from './get-cartype.service';

@Controller('bannayuu/api/visitor/get-cartype')
export class GetCartypeController {
    constructor(private readonly getCartypeService:GetCartypeService){}
    @Get('cartypeinfo')
    getCartype(@Body() body){
        return this.getCartypeService.getCartype(body);
    }
}
