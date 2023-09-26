import { SosService } from './sos.service';
export declare class SosController {
    private readonly sosService;
    constructor(sosService: SosService);
    getCartype(body: any): Promise<void>;
    getSosHistoryByCompany(body: any): Promise<void>;
    getSosInfoById(body: any): Promise<void>;
    saveCorporateReceive(body: any): Promise<void>;
}
