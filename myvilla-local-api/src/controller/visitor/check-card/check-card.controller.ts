import { Body,Post, Controller, Get } from '@nestjs/common';
import { CheckCardService } from './check-card.service';

@Controller('bannayuu/api/visitor/check-card')
export class CheckCardController {
    constructor(private readonly checkCardService :CheckCardService){}
    @Post('check')
    checkCardVisitor(@Body() body){
        return this.checkCardService.checkCardVisitor(body);
    }
}
