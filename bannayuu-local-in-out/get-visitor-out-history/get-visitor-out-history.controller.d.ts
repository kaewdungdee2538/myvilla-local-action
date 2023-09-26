import { GetVisitorOutHistoryService } from './get-visitor-out-history.service';
export declare class GetVisitorOutHistoryController {
    private readonly getVisitorOutHistoryService;
    constructor(getVisitorOutHistoryService: GetVisitorOutHistoryService);
    getSlipIn(body: any): Promise<void>;
}
