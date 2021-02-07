import { Body, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ActionInService } from './action-in.service';
import { diskStorage } from 'multer';
import { editFileName, getCurrentDatePathFileSave, imageFileFilter } from 'src/middleware/image_manual/uploadfile.middleware';

@Controller('bannayuu/api/visitor/action/in')
export class ActionInController {
    constructor(private readonly actionINService:ActionInService){}
    // @UseGuards(JwtAuthGuard)
    @Post('save')
    @UseInterceptors(
        FilesInterceptor('image', 20, {
            storage: diskStorage({
                destination: getCurrentDatePathFileSave,
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    ActionSaveIn(@UploadedFiles() files,@Body() body){
        console.log(files);
        return this.actionINService.ActionSaveIn(body);
    }
}
