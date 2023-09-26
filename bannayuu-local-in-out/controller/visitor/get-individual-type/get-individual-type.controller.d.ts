import { GetIndividualTypeService } from './get-individual-type.service';
export declare class GetIndividualTypeController {
    private readonly getIndividualTypeService;
    constructor(getIndividualTypeService: GetIndividualTypeService);
    getIndiviDualType(body: any): Promise<void>;
}
