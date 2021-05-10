import {configfile} from '../../../conf/config-setting'
import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { EstampInterceptor } from 'src/interceptor/estamp/estamp.interceptor';
import { VsEstampService } from './vs-estamp.service';
import { diskStorage } from 'multer';
import { editFileName, getCurrentDatePathFileSave, imageFileFilter } from 'src/middleware/image_manual/uploadfile.middleware';
import { EstampSaveVisitorMiddleware } from 'src/middleware/estamp/EstampSaveVisitor.middleware';
import { DefaultInterceptor } from 'src/interceptor/default/default.interceptor';

@Controller('bannayuu/api/visitor/estamp')
export class VsEstampController {
    constructor(private readonly vsEstampService:VsEstampService){}
    @Post('get-visitorinfo')
    async getVisitorInfo(@Body() body){
        return this.vsEstampService.getVisitorInfo(body);
    }

    @Post('stamp')
    @UseInterceptors(
        EstampInterceptor,
        FileFieldsInterceptor([
            {name:'image_customer',maxCount:1}
        ],{
            storage: diskStorage({
                destination: getCurrentDatePathFileSave,
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
            limits:{fileSize: 1024*1024*5}
        }),
        EstampSaveVisitorMiddleware,
        DefaultInterceptor
    )
    async postStampVisitor(@UploadedFiles() files, @Body() body){
        const pathMain = configfile.PATHSAVEIMAGE;
        const pathCustomer = files.image_customer.map(file=>{
            return file.path.replace(pathMain,'');
        })
        const estampInfo = await this.vsEstampService.getEstampInfo(body);
        return this.vsEstampService.saveEstampVisitor(body,pathCustomer[0],estampInfo);
    }
}
