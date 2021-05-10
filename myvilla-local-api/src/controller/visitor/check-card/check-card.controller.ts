import { Body,Post, Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CheckCardService } from './check-card.service';

@Controller('bannayuu/api/visitor/check-card')
export class CheckCardController {
    constructor(private readonly checkCardService :CheckCardService){}
    
    @Post('check')
    @UseGuards(JwtAuthGuard)
    checkCardVisitor(@Body() body){
        return this.checkCardService.checkCardVisitor(body);
    }
}
