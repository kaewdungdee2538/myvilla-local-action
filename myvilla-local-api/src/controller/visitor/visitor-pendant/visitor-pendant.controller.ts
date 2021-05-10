import { Body, Controller, Get,Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { VisitorPendantService } from './visitor-pendant.service';

@Controller('bannayuu/api/visitor/visitor-pendant')
export class VisitorPendantController {
    constructor(private readonly visitorPendantService:VisitorPendantService){}
    
    @Post('getall')
    @UseGuards(JwtAuthGuard)
    async getVisitorPendantAll(@Body() body){
        return await this.visitorPendantService.getVisitorPendantAll(body);
    }
}
