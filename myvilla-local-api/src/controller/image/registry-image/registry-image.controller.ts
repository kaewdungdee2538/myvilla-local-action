import { Body, Controller, Post, UseGuards,Request} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtRegistryImage } from './jwt-registry-image.guard';
import { RegistryImageService } from './registry-image.service';

@Controller('bannayuu/api/registry-image')
export class RegistryImageController {
    constructor(
        private readonly registryImageService:RegistryImageService
        ){}
    
    @Post('registry')
    registryImage(@Body() body){
        return this.registryImageService.validateImage(body);
    }

    @UseGuards(JwtRegistryImage)
    @Post('access')
    accessImage(@Request() req){
        console.log(req.user.image_path);
        return req.user.image_path;
    }
}
