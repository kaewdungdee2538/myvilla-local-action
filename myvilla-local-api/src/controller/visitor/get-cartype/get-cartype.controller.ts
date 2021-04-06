import { Body, Post,Controller, Get } from '@nestjs/common';
import { GetCartypeService } from './get-cartype.service';

@Controller('bannayuu/api/visitor/get-cartype')
export class GetCartypeController {
    constructor(private readonly getCartypeService:GetCartypeService){}
    @Post('cartypeinfo')
    getCartype(@Body() body){
        return this.getCartypeService.getCartype(body);
    }
}
