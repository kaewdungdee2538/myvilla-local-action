import { GetSlipService } from './get-slip.service';
export declare class GetSlipController {
    private readonly getslipService;
    constructor(getslipService: GetSlipService);
    getSlipIn(body: any): Promise<void>;
    getSlipOut(body: any): Promise<void>;
}
