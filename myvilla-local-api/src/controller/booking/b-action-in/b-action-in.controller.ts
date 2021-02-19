import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { BActionInInterceptor } from 'src/interceptor/booking/action-in/b-action-in.interceptor';
import { BActionInMiddleware } from 'src/middleware/booking/action-in/b_action_in.middleware';
import { editFileName, getCurrentDatePathFileSave, imageFileFilter } from 'src/middleware/image_manual/uploadfile.middleware';
import { VsActionInCheckHomeIDMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_checkhomeid.middleware';
import { VsActionInCheckEmployeeMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_check_employee.middleware';
import { VsActionInInfoMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_info.middleware';
import { VsActionInSaveMiddleware } from 'src/middleware/visitor/action-in/vs_action_in_save.middleware';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { LoadSettingLocalUtils } from 'src/utils/load_setting_local.utils';
import { BActionInService } from './b-action-in.service';
@Controller('bannayuu/api/booking/b-action-in')
export class BActionInController {
    constructor(
        private readonly bActionINService: BActionInService
        , private readonly errMessageUtilsTh: ErrMessageUtilsTH
        , private readonly vsActionInforMiddleware: VsActionInInfoMiddleWare
        , private readonly vsActionSaveIn: VsActionInSaveMiddleware
        , private readonly bActionInMiddleware: BActionInMiddleware
        , private readonly vsActionCheckHomeID: VsActionInCheckHomeIDMiddleWare
        , private readonly vsActionCheckEmployee: VsActionInCheckEmployeeMiddleWare
        , private readonly loadSettingLocalUtils: LoadSettingLocalUtils
    ) { }

    // @UseGuards(JwtAuthGuard)
    @Post('save')
    @UseInterceptors(
        BActionInInterceptor,
        FileFieldsInterceptor([
            { name: 'image_card', maxCount: 1 }
            , { name: 'image_vehicle', maxCount: 1 }
        ], {
            storage: diskStorage({
                destination: getCurrentDatePathFileSave,
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        })
        // FilesInterceptor('image', 20, {
        //     storage: diskStorage({
        //         destination: getCurrentDatePathFileSaveIn,
        //         filename: editFileName,
        //     }),
        //     fileFilter: imageFileFilter,
        // }),
    )
    async saveBookingIn(@UploadedFiles() files, @Body() body) {
        console.log('Files' + JSON.stringify(files));
        const pathMain = process.env.PATHSAVEIMAGE;
        if (!files.image_card) {
            throw new StatusException(
                {
                    error: this.errMessageUtilsTh.errImageCardNotFound
                    , result: null
                    , message: this.errMessageUtilsTh.errImageCardNotFound
                    , statusCode: 400
                }, 400
            )
        } else if (!files.image_vehicle) {
            throw new StatusException(
                {
                    error: this.errMessageUtilsTh.errImageVehicleNotFound
                    , result: null
                    , message: this.errMessageUtilsTh.errImageVehicleNotFound
                    , statusCode: 400
                }, 400
            )
        }
        const pathDriver = files.image_card.map(file => {
            return file.path.replace(pathMain, '');
        })
        console.log(pathDriver);
        const pathLicense = files.image_vehicle.map(file => {
            return file.path.replace(pathMain, '');
        })
        console.log(pathLicense);
        const imagesNameObj = {
            image_card: pathDriver[0]
            , image_vehicle: pathLicense[0]
        }
        //---------------------Middle ware
        const VisitorSaveInMiddleware = this.vsActionSaveIn.CheckSaveIn(body);
        let VisitorInfoMiddleware = null;
       
        if (await this.loadSettingLocalUtils.getBookingMode(body.company_id) === 'qr_and_verifycard')
            VisitorInfoMiddleware = this.vsActionInforMiddleware.CheclVisitorinfo(body);
        const BookingMiddleware = await this.bActionInMiddleware.CheckSaveIn(body);

        if (VisitorSaveInMiddleware) {
            throw new StatusException(
                {
                    error: VisitorSaveInMiddleware
                    , result: null
                    , message: VisitorSaveInMiddleware
                    , statusCode: 400
                }, 400
            )
        } else if (VisitorInfoMiddleware) {
            throw new StatusException(
                {
                    error: VisitorInfoMiddleware
                    , result: null
                    , message: VisitorInfoMiddleware
                    , statusCode: 400
                }, 400
            )
        } else if (BookingMiddleware) {
            throw new StatusException(
                {
                    error: BookingMiddleware
                    , result: null
                    , message: BookingMiddleware
                    , statusCode: 400
                }, 400
            )
        }
        //----------------Check Booking
        const checkTBVCode = await this.bActionInMiddleware.checkTbvCode(body);
        if (!checkTBVCode) throw new StatusException(
            {
                error: this.errMessageUtilsTh.errBookingNotFound
                , result: null
                , message: this.errMessageUtilsTh.errBookingNotFound
                , statusCode: 400
            }, 400)
        const getEmployeeID = await this.vsActionCheckEmployee.CheckInEmployee(body);
        if (!getEmployeeID) throw new StatusException(
            {
                error: this.errMessageUtilsTh.errEmployeeIDNotInDatabase
                , result: null
                , message: this.errMessageUtilsTh.errEmployeeIDNotInDatabase
                , statusCode: 400
            }, 400
        )
        const getHomeID = await this.vsActionCheckHomeID.CheckHomeID(body);
        if (await getHomeID) {

            return await this.bActionINService.saveBookingIn(body, imagesNameObj, getHomeID, checkTBVCode,getEmployeeID);
        } else throw new StatusException(
            {
                error: this.errMessageUtilsTh.errHomeIDNotInDataBase
                , result: null
                , message: this.errMessageUtilsTh.errHomeIDNotInDataBase
                , statusCode: 400
            }, 400
        )
    }
}
