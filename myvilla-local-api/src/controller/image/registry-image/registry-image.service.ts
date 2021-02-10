import { Body, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RegistryImageService {
    constructor(private jwtService: JwtService) { }
    async validateImage(image_path: any) {
        console.log(image_path);
        if (image_path)
            return await this.registyImage(image_path);
        else
            return null;
    }

    async registyImage(image_path: string) {
        const payload = image_path
        const access_token = {
            access_token: this.jwtService.sign(payload)
        }
        return access_token;
    }
}
