import { Body,Post, Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { VisitorGetPriceofcardlossService } from './visitor-get-priceofcardloss.service';

@Controller('bannayuu/api/visitor/cardloss/get-priceofcardloss')
export class VisitorGetPriceofcardlossController {
    constructor(private readonly visitorGetPriceOfCardlossService:VisitorGetPriceofcardlossService){}
    
    @Post('getprice')
    @UseGuards(JwtAuthGuard)
    getPriceOfCardLoss(@Body() body){
        return this.visitorGetPriceOfCardlossService.getPriceOfCardLoss(body);
    }

}
