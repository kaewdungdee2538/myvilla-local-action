import { GetBookingOutInfoService } from './get-booking-out-info.service';
export declare class GetBookingOutInfoController {
    private readonly getBookingOutInfoService;
    constructor(getBookingOutInfoService: GetBookingOutInfoService);
    getBookingOutInfo(body: any, req: any): Promise<void>;
}
