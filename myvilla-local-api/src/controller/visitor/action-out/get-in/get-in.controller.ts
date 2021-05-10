import { Body,Post, Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RegistryImageService } from 'src/controller/image/registry-image/registry-image.service';
import { GetInService } from './get-in.service';

@Controller('bannayuu/api/visitor/action/out/get-in')
export class GetInController {
    constructor(
        private readonly getInService :GetInService
        ){}
    @Post('getaction-info')
    @UseGuards(JwtAuthGuard)
    getActionInInfo(@Body() body){
        return this.getInService.getActionInInfo(body);
    }
}
