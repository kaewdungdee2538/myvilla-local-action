import { GetInService } from './get-in.service';
export declare class GetInController {
    private readonly getInService;
    constructor(getInService: GetInService);
    getActionInInfo(body: any, req: any): Promise<void>;
}
