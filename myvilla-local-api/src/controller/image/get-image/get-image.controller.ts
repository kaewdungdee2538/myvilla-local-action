import { Body, Controller, Get,Post, Header,Request, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtRegistryImage } from '../registry-image/jwt-registry-image.guard';
import { GetImageService } from './get-image.service';

@Controller('bannayuu/api/manual/get-image')
export class GetImageController {
    constructor(private readonly getImageService :GetImageService){}
    @Post('get')
    // @UseGuards(JwtAuthGuard)
    getImage(@Request() req,@Res() res){
        return this.getImageService.getImageWithPathFile(req,res);
    }
}
