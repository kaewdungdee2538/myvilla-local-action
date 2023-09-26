import { GetBookingInfoService } from './get-booking-info.service';
export declare class GetBookingInfoController {
    private readonly getBookingInfoService;
    constructor(getBookingInfoService: GetBookingInfoService);
    getBookingInfo(body: any): Promise<void>;
}
