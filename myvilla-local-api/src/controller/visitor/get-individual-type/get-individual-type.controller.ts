import { Body, Controller, Get } from '@nestjs/common';
import { GetIndividualTypeService } from './get-individual-type.service';

@Controller('bannayuu/api/visitor/get-individual-type')
export class GetIndividualTypeController {
    constructor(private readonly getIndividualTypeService :GetIndividualTypeService){}
    @Get('getindividual')
    getIndiviDualType(@Body() body){
        return this.getIndividualTypeService.getIndiviDualType(body);
    }
}
