import { Body, Controller, Post,Get } from '@nestjs/common';
import { GetHomeService } from './get-home.service';

@Controller('bannayuu/api/visitor/get-home')
export class GetHomeController {
    constructor(private readonly getHomeService:GetHomeService){}
    @Get('homeinfo')
    getHomeInfo(@Body() body){
        return this.getHomeService.getHomeInfo(body);
    }
}
