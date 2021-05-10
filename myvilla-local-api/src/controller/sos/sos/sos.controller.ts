import { Body, Controller, Post,Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SosService } from './sos.service';

@Controller('bannayuu/api/sos')
export class SosController {
    constructor(private readonly sosService:SosService){}

    @Post('get-not-approve')
    @UseGuards(JwtAuthGuard)
    getCartype(@Body() body){
        return this.sosService.getSosAllByCompany(body);
    }


    @Post('get-by-id')
    @UseGuards(JwtAuthGuard)
    async getSosInfoById(@Body() body){
        return this.sosService.getSosInfoById(body);
    }


    @Post('corporate-receive')
    @UseGuards(JwtAuthGuard)
    async saveCorporateReceive(@Body() body){
        return this.sosService.saveCorporateReceive(body)
    }
}
