import { ResetVisitorService } from './reset-visitor.service';
export declare class ResetVisitorController {
    private readonly resetVisitorService;
    constructor(resetVisitorService: ResetVisitorService);
    resetVisitorData(): Promise<void>;
}
