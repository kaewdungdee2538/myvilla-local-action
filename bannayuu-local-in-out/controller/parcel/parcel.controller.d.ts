import { ParcelService } from './parcel.service';
export declare class ParcelController {
    private readonly parcelService;
    constructor(parcelService: ParcelService);
    addParcelReceive(files: any, body: any, req: any): Promise<void>;
}
