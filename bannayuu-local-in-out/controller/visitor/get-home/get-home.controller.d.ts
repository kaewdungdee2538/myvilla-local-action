import { GetHomeService } from './get-home.service';
export declare class GetHomeController {
    private readonly getHomeService;
    constructor(getHomeService: GetHomeService);
    getHomeInfo(body: any): Promise<void>;
}
