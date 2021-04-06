import { Body, Controller, Get,Post } from '@nestjs/common';
import { GetIndividualTypeService } from './get-individual-type.service';

@Controller('bannayuu/api/visitor/get-individual-type')
export class GetIndividualTypeController {
    constructor(private readonly getIndividualTypeService :GetIndividualTypeService){}
    @Post('getindividual')
    getIndiviDualType(@Body() body){
        return this.getIndividualTypeService.getIndiviDualType(body);
    }
}
