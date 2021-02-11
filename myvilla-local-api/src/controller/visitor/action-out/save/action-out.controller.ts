import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { editFileName, getCurrentDatePathFileSaveOut, imageFileFilter } from 'src/middleware/image_manual/uploadfile.middleware';
import { diskStorage } from 'multer';
import { ActionOutSaveService } from './action-out.service';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { VsActionOutSlotOrCardMiddleWare } from 'src/middleware/visitor/action-out/save/vs_action_out_slotorcard.middleware';
import { VsActionOutForSaveMiddleWare } from 'src/middleware/visitor/action-out/save/vs_action_out_forsave.middleware';

@Controller('bannayuu/api/visitor/action/out')
export class ActionOutSaveController {
    constructor(
        private readonly saveOutService: ActionOutSaveService
        , private readonly errMessageUtilsTh: ErrMessageUtilsTH
        , private readonly vsactionOutSlotOrCardMid: VsActionOutSlotOrCardMiddleWare
        , private readonly vsactionOutForSaveMid: VsActionOutForSaveMiddleWare
    ) { }

    // @UseGuards(JwtAuthGuard)
    @Post('save')
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'image_vehicle', maxCount: 1 }
            // , { name: 'image_license', maxCount: 1 }
        ], {
            storage: diskStorage({
                destination: getCurrentDatePathFileSaveOut,
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        })
        // FilesInterceptor('image', 20, {
        //     storage: diskStorage({
        //         destination: getCurrentDatePathFileSaveOut,
        //         filename: editFileName,
        //     }),
        //     fileFilter: imageFileFilter,
        // }), FilesInterceptor('image2', 20, {
        //     storage: diskStorage({
        //         destination: getCurrentDatePathFileSaveOut,
        //         filename: editFileName,
        //     }),
        //     fileFilter: imageFileFilter,
        // }),
    )
    async ActionSaveOut(@UploadedFiles() files, @Body() body) {
        console.log('Files' + JSON.stringify(files));
        const pathMain = process.env.PATHSAVEIMAGE;
        if (!files.image_vehicle) {
            throw new StatusException(
                {
                    error: this.errMessageUtilsTh.errImageVehicleNotFound
                    , result: null
                    , message: this.errMessageUtilsTh.errImageVehicleNotFound
                    , statusCode: 400
                }, 400
            )
        }
        // } else if (!files.image_vehicle) {
        //     throw new StatusException(
        //         {
        //             error: this.errMessageUtilsTh.errImageLicenseNotFound
        //             , result: null
        //             , message: this.errMessageUtilsTh.errImageLicenseNotFound
        //             , statusCode: 400
        //         }, 400
        //     )
        // }
        const pathDriver = files.image_vehicle.map(file => {
            return file.path.replace(pathMain, '');
        })
       
        // const pathLicense = files.image_vehicle.map(file => {
        //     return file.path.replace(pathMain, '');
        // })
       
        const imagesNameObj = {
            image_vehicle: pathDriver[0]
            // , image_license: pathLicense[0]
        }
        //---------------------Middle ware
        const middlewareSaveOut = this.vsactionOutForSaveMid.CheckVisitorOut(body);
        if (middlewareSaveOut)
            throw new StatusException(
                {
                    error: middlewareSaveOut
                    , result: null
                    , message: middlewareSaveOut
                    , statusCode: 400
                }, 400
            )
        const middlewareSlotOrCardSaveOut = await this.vsactionOutSlotOrCardMid.CheckVisitorOut(body);
        if (middlewareSlotOrCardSaveOut)
            throw new StatusException(
                {
                    error: middlewareSlotOrCardSaveOut
                    , result: null
                    , message: middlewareSlotOrCardSaveOut
                    , statusCode: 400
                }, 400
            )
        return this.saveOutService.saveActionOut(imagesNameObj, body);
    }
}
