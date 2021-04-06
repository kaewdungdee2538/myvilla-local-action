import { Body, Controller, Get,Post } from '@nestjs/common';
import { GetCartypeCategoryAllService } from './get-cartype-category-all.service';

@Controller('bannayuu/api/visitor/get-cartype-category-all')
export class GetCartypeCategoryAllController {
    constructor(private readonly getCartypeCategoryAllService:GetCartypeCategoryAllService){}
    @Post('getall')
    getCartypeCategoryAll(@Body() body){
        return this.getCartypeCategoryAllService.getCartypeCategoryAll(body);
    }
}
