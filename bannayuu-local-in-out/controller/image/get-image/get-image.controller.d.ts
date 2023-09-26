import { GetImageService } from './get-image.service';
export declare class GetImageController {
    private readonly getImageService;
    constructor(getImageService: GetImageService);
    getImage(req: any, res: any): Promise<any>;
}
