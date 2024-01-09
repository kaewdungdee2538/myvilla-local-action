import { EstampService } from './estamp.service';
import { configfile } from 'src/conf/config-setting';
import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  editFileName,
  getCurrentDatePathFileForPacelSave,
  imageFileFilter,
} from 'src/middleware/image_manual/uploadfile.middleware';
import { EstampInterceptor } from 'src/interceptor/estamp/estamp.interceptor';
import { EstampSaveMiddleware } from 'src/middleware/estamp/EstampSave.middleware';
import { DefaultInterceptor } from 'src/interceptor/default/default.interceptor';
import { OverwritingRemarkImages } from 'src/middleware/image_manual/watermark/image-watermark.middleware';

@Controller('bannayuu/api/estamp')
export class EstampController {
    constructor(private readonly estampService: EstampService) {}
    @Post('save')
    @UseInterceptors(
    EstampInterceptor,
    FileFieldsInterceptor([{ name: 'image_customer', maxCount: 1 }], {
      storage: diskStorage({
        destination: getCurrentDatePathFileForPacelSave,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      limits: { fileSize: 1024 * 1024 * 5 },
    }),
    EstampSaveMiddleware,
    DefaultInterceptor,
  )
  async postStampVisitor(@UploadedFiles() files, @Body() body) {
    const pathMain = configfile.PATHPACELSAVEIMAGE;
    const pathCustomer = files?.image_customer?.map((file) => {
      return file.path.replace(pathMain, '');
    });

    // overwriting images
    OverwritingRemarkImages(files.image_customer);

    return this.estampService.saveEstamp(
      body,
      pathCustomer ? pathCustomer[0] : '',
    );
  }
}
