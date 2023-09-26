import { RegistryImageService } from './registry-image.service';
export declare class RegistryImageController {
    private readonly registryImageService;
    constructor(registryImageService: RegistryImageService);
    registryImage(body: any): Promise<{
        access_token: string;
    }>;
    accessImage(req: any): any;
}
