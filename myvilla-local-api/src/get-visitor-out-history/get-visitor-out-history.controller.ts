import { Body, Controller, Get,Post, UseGuards } from '@nestjs/common';
import {GetVisitorOutHistoryService} from './get-visitor-out-history.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('bannayuu/api/visitor/get-visitor-out')
export class GetVisitorOutHistoryController {
    constructor(private readonly getVisitorOutHistoryService:GetVisitorOutHistoryService){}

    @Post('history')
    @UseGuards(JwtAuthGuard)
    getSlipIn(@Body() body){
        return this.getVisitorOutHistoryService.getVisitorOutHistory(body);
    }
}
