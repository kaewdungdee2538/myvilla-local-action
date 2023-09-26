import { GetCartypeCategoryAllService } from './get-cartype-category-all.service';
export declare class GetCartypeCategoryAllController {
    private readonly getCartypeCategoryAllService;
    constructor(getCartypeCategoryAllService: GetCartypeCategoryAllService);
    getCartypeCategoryAll(body: any): Promise<void>;
}
