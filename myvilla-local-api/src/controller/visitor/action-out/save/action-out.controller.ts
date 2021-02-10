import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { editFileName, getCurrentDatePathFileSaveOut, imageFileFilter } from 'src/middleware/image_manual/uploadfile.middleware';
import { diskStorage } from 'multer';
import { ActionOutSaveService } from './action-out.service';

@Controller('bannayuu/api/visitor/action/out')
export class ActionOutSaveController {
    constructor(private readonly saveOutService :ActionOutSaveService){}
    
    // @UseGuards(JwtAuthGuard)
    @Post('save')
    @UseInterceptors(
        FilesInterceptor('image', 20, {
            storage: diskStorage({
                destination: getCurrentDatePathFileSaveOut,
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async ActionSaveOut(@UploadedFiles() files, @Body() body) {
        return this.saveOutService.saveActionOut(files,body);
    }
}
