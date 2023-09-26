import { VsEstampService } from './vs-estamp.service';
export declare class VsEstampController {
    private readonly vsEstampService;
    constructor(vsEstampService: VsEstampService);
    getVisitorInfo(body: any): Promise<void>;
    postStampVisitor(files: any, body: any): Promise<void>;
}
