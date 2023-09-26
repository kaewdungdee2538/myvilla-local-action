import { JwtService } from '@nestjs/jwt';
export declare class RegistryImageService {
    private jwtService;
    constructor(jwtService: JwtService);
    validateImage(image_path: any): Promise<{
        access_token: string;
    }>;
    registyImage(image_path: string): Promise<{
        access_token: string;
    }>;
}
