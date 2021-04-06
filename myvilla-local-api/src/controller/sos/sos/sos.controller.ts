import { Body, Controller, Post,Request } from '@nestjs/common';
import { SosService } from './sos.service';

@Controller('bannayuu/api/sos')
export class SosController {
    constructor(private readonly sosService:SosService){}
    // @UseGuards(JwtAuthGuard)
    @Post('get-not-approve')
    getCartype(@Body() body){
        return this.sosService.getSosAllByCompany(body);
    }

    // @UseGuards(JwtAuthGuard)
    @Post('get-by-id')
    async getSosInfoById(@Body() body){
        return this.sosService.getSosInfoById(body);
    }

    // @UseGuards(JwtAuthGuard)
    @Post('corporate-receive')
    async saveCorporateReceive(@Body() body){
        return this.sosService.saveCorporateReceive(body)
    }
}
