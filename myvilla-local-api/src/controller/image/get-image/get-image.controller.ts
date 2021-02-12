import { Body, Controller, Get, Header,Request, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtRegistryImage } from '../registry-image/jwt-registry-image.guard';
import { GetImageService } from './get-image.service';

@Controller('bannayuu/api/manual/get-image')
export class GetImageController {
    constructor(private readonly getImageService :GetImageService){}
    @Get('get')
    // @UseGuards(JwtAuthGuard)
    getImage(@Request() req,@Res() res){
        return this.getImageService.getImageWithPathFile(req,res);
    }
}
