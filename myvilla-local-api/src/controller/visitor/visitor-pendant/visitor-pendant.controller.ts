import { Body, Controller, Get,Post } from '@nestjs/common';
import { VisitorPendantService } from './visitor-pendant.service';

@Controller('bannayuu/api/visitor/visitor-pendant')
export class VisitorPendantController {
    constructor(private readonly visitorPendantService:VisitorPendantService){}
    
    @Post('getall')
    async getVisitorPendantAll(@Body() body){
        return await this.visitorPendantService.getVisitorPendantAll(body);
    }
}
