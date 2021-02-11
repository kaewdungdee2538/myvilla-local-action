import { Body, Controller, Get } from '@nestjs/common';
import { GetContactTypeService } from './get-contact-type.service';

@Controller('bannayuu/api/visitor/get-contact-type')
export class GetContactTypeController {
    constructor(private readonly getContactTypeService:GetContactTypeService){}
    @Get('getcontact')
    getContactType(@Body() body){
        return this.getContactTypeService.getContactType(body);
    }
}
