import { Body, Controller, Get } from '@nestjs/common';
import { VisitorPendantService } from './visitor-pendant.service';

@Controller('bannayuu/api/visitor/visitor-pendant')
export class VisitorPendantController {
    constructor(private readonly visitorPendantService:VisitorPendantService){}
    
    @Get('getall')
    async getVisitorPendantAll(@Body() body){
        return await this.visitorPendantService.getVisitorPendantAll(body);
    }
}
