import { Body, Controller,Request, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ParcelService } from './parcel.service';
import { diskStorage } from 'multer';
import { editFileName, getCurrentDatePathFileSave, imageFileFilter } from 'src/middleware/image_manual/uploadfile.middleware';
import { ReceiveParcelInterceptor } from 'src/interceptor/pacel/recieve-pacel.interceptor';
import { DefaultInterceptor } from 'src/interceptor/default/default.interceptor';
import { ParcelReceiveInterceptor } from 'src/interceptor/pacel/parcel-receive.interceptor';
import { HomeInterceptor } from 'src/interceptor/home/home.interceptor';
import { configfile } from 'src/conf/config-setting';

@Controller('bannayuu/api/parcel')
export class ParcelController {
    constructor(private readonly parcelService:ParcelService){}

    @Post('receive-parcel')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        ReceiveParcelInterceptor,
        FileFieldsInterceptor([
            {name:'image_parcel_receive',maxCount:1}
        ],{
            storage: diskStorage({
                destination: getCurrentDatePathFileSave,
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
            limits:{fileSize: 1024*1024*5}
        }),
        DefaultInterceptor,
        ParcelReceiveInterceptor,
        HomeInterceptor
    )
    async addParcelReceive(@UploadedFiles() files, @Body() body,@Request() req){
        const pathMain = configfile.PATHSAVEIMAGE;
        const pathCustomer = !files.image_parcel_receive ? [] : files.image_parcel_receive.map(file=>{
            const newfilename = file.path.replace(pathMain,'');
            return newfilename.replace(/\\/g, '/');
        })
        console.log(body)
        return await this.parcelService.addParcelReceive(body,req,pathCustomer)
    }
}
