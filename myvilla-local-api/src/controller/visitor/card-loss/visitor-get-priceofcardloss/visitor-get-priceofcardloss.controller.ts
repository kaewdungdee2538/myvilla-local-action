import { Body, Controller, Get } from '@nestjs/common';
import { VisitorGetPriceofcardlossService } from './visitor-get-priceofcardloss.service';

@Controller('bannayuu/api/visitor/cardloss/get-priceofcardloss')
export class VisitorGetPriceofcardlossController {
    constructor(private readonly visitorGetPriceOfCardlossService:VisitorGetPriceofcardlossService){}
    @Get('getprice')
    getPriceOfCardLoss(@Body() body){
        return this.visitorGetPriceOfCardlossService.getPriceOfCardLoss(body);
    }

}
