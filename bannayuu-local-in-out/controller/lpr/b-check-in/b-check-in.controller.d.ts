import { LPRBCheckInService } from './b-check-in.service';
export declare class LPRBCheckInController {
    private readonly bCheckInService;
    constructor(bCheckInService: LPRBCheckInService);
    getBookingWithLPR(body: any): Promise<void>;
}
