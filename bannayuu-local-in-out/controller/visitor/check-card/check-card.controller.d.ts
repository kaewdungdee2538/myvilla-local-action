import { CheckCardService } from './check-card.service';
export declare class CheckCardController {
    private readonly checkCardService;
    constructor(checkCardService: CheckCardService);
    checkCardVisitor(body: any): Promise<void>;
}
