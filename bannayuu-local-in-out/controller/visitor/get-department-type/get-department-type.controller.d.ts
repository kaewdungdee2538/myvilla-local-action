import { GetDepartmentTypeService } from './get-department-type.service';
export declare class GetDepartmentTypeController {
    private readonly getDepartmentTypeService;
    constructor(getDepartmentTypeService: GetDepartmentTypeService);
    getContactType(body: any): Promise<void>;
}
