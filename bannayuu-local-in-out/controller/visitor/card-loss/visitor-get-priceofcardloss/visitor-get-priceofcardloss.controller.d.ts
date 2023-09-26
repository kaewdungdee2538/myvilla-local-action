import { VisitorGetPriceofcardlossService } from './visitor-get-priceofcardloss.service';
export declare class VisitorGetPriceofcardlossController {
    private readonly visitorGetPriceOfCardlossService;
    constructor(visitorGetPriceOfCardlossService: VisitorGetPriceofcardlossService);
    getPriceOfCardLoss(body: any): Promise<void>;
}
