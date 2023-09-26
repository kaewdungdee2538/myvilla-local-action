import { GetCartypeService } from './get-cartype.service';
export declare class GetCartypeController {
    private readonly getCartypeService;
    constructor(getCartypeService: GetCartypeService);
    getCartype(body: any): Promise<void>;
}
