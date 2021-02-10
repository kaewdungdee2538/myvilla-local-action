import { Body, Controller, Get, Header,Request, Res, UseGuards } from '@nestjs/common';
import { JwtRegistryImage } from '../registry-image/jwt-registry-image.guard';
import { GetImageService } from './get-image.service';

@Controller('bannayuu/api/manual/get-image')
export class GetImageController {
    constructor(private readonly getImageService :GetImageService){}
    @Get('get')
    @UseGuards(JwtRegistryImage)
    getImage(@Request() req,@Res() res){
        return this.getImageService.getImageWithPathFile(req,res);
    }
}
