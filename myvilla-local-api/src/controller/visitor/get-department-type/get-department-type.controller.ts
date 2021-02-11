import { Body, Controller, Get } from '@nestjs/common';
import { GetDepartmentTypeService } from './get-department-type.service';

@Controller('bannayuu/api/visitor/get-department-type')
export class GetDepartmentTypeController {
    constructor(private readonly getDepartmentTypeService:GetDepartmentTypeService){}
    @Get('getdepartment')
    getContactType(@Body() body){
        return this.getDepartmentTypeService.getDepartmentType(body);
    }
}
