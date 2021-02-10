import { Body, Controller, Get, Header, Res } from '@nestjs/common';
import { GetImageService } from './get-image.service';

@Controller('bannayuu/api/manual/get-image')
export class GetImageController {
    constructor(private readonly getImageService :GetImageService){}
    @Get('get')
    // @Header('Content-Type', 'image/png')
    getImage(@Body() body,@Res() res){
        return this.getImageService.getImageWithPathFile(body,res);
    }
}
