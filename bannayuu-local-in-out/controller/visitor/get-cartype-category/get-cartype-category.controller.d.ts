import { GetCartypeCategoryService } from './get-cartype-category.service';
export declare class GetCartypeCategoryController {
    private readonly getCartypeCategoryService;
    constructor(getCartypeCategoryService: GetCartypeCategoryService);
    getCartypeCategory(body: any): Promise<void>;
}
