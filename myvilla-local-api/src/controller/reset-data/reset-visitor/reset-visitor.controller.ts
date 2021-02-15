import { Controller, Get } from '@nestjs/common';
import { ResetVisitorService } from './reset-visitor.service';

@Controller('bannayuu/api/reset/visitor')
export class ResetVisitorController {
    constructor(private readonly resetVisitorService:ResetVisitorService){}
    @Get()
    resetVisitorData(){
        return this.resetVisitorService.resetVisitorData();
    }
}
