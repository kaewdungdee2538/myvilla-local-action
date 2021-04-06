import { Body, Controller, Get,Post } from '@nestjs/common';
import { GetCartypeCategoryService } from './get-cartype-category.service';

@Controller('bannayuu/api/visitor/get-cartype-category')
export class GetCartypeCategoryController {
    constructor(private readonly getCartypeCategoryService:GetCartypeCategoryService){}
    @Post('getcategory')
    getCartypeCategory(@Body() body){
        return this.getCartypeCategoryService.getCartypeCategory(body);
    }
}
