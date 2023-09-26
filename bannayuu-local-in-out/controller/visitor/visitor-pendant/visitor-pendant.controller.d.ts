import { VisitorPendantService } from './visitor-pendant.service';
export declare class VisitorPendantController {
    private readonly visitorPendantService;
    constructor(visitorPendantService: VisitorPendantService);
    getVisitorPendantAll(body: any): Promise<void>;
}
