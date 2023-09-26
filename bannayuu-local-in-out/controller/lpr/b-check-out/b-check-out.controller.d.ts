import { LPRBCheckOutService } from './b-check-out.service';
export declare class LPRBCheckOutController {
    private readonly bCheckOutService;
    constructor(bCheckOutService: LPRBCheckOutService);
    getBookingOutWithLPR(body: any, req: any): Promise<void>;
}
