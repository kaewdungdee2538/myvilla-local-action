import { Body, Controller, Get } from '@nestjs/common';
import { GetCartypeCategoryService } from './get-cartype-category.service';

@Controller('bannayuu/api/visitor/get-cartype-category')
export class GetCartypeCategoryController {
    constructor(private readonly getCartypeCategoryService:GetCartypeCategoryService){}
    @Get('getcategory')
    getCartypeCategory(@Body() body){
        return this.getCartypeCategoryService.getCartypeCategory(body);
    }
}
