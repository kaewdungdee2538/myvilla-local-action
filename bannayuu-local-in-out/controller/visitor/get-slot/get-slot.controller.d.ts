import { GetSlotService } from './get-slot.service';
export declare class GetSlotController {
    private readonly getSlotService;
    constructor(getSlotService: GetSlotService);
    getSlotNotUse(body: any): Promise<void>;
    getSlotNotUseAll(body: any): Promise<void>;
    getSlotNotUseById(body: any): Promise<void>;
}
