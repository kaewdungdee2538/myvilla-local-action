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
import {configfile} from '../../../conf/config-setting'
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
            limits: { fileSize: 1024 * 1024 * 5 }
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
        const pathMain = configfile.PATHSAVEIMAGE;
        if (!files.image_card) {
            throw new StatusException(
                {
                    error: this.errMessageUtilsTh.errImageCardNotFound
                    , result: null
                    , message: this.errMessageUtilsTh.errImageCardNotFound
                    , statusCode: 200
                }, 200
            )
        } else if (!files.image_vehicle) {
            throw new StatusException(
                {
                    error: this.errMessageUtilsTh.errImageVehicleNotFound
                    , result: null
                    , message: this.errMessageUtilsTh.errImageVehicleNotFound
                    , statusCode: 200
                }, 200
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

        if (await this.loadSettingLocalUtils.getBookingInMode(body.company_id) === 'qr_and_identitycard')
            VisitorInfoMiddleware = this.vsActionInforMiddleware.CheclVisitorinfo(body);
        const BookingMiddleware = await this.bActionInMiddleware.CheckSaveIn(body);

        if (VisitorSaveInMiddleware) {
            throw new StatusException(
                {
                    error: VisitorSaveInMiddleware
                    , result: null
                    , message: VisitorSaveInMiddleware
                    , statusCode: 200
                }, 200
            )
        } else if (VisitorInfoMiddleware) {
            throw new StatusException(
                {
                    error: VisitorInfoMiddleware
                    , result: null
                    , message: VisitorInfoMiddleware
                    , statusCode: 200
                }, 200
            )
        } else if (BookingMiddleware) {
            throw new StatusException(
                {
                    error: BookingMiddleware
                    , result: null
                    , message: BookingMiddleware
                    , statusCode: 200
                }, 200
            )
        }
        //----------------Check Booking
        const checkTBVCode = await this.bActionInMiddleware.checkTbvCode(body);
        if (!checkTBVCode) throw new StatusException(
            {
                error: this.errMessageUtilsTh.errBookingNotFound
                , result: null
                , message: this.errMessageUtilsTh.errBookingNotFound
                , statusCode: 200
            }, 200)
        const getEmployeeID = await this.vsActionCheckEmployee.CheckInEmployee(body);
        if (!getEmployeeID) throw new StatusException(
            {
                error: this.errMessageUtilsTh.errEmployeeIDNotInDatabase
                , result: null
                , message: this.errMessageUtilsTh.errEmployeeIDNotInDatabase
                , statusCode: 200
            }, 200
        )
        const getHomeIDFromTBV = await this.bActionInMiddleware.getHomeIDFromTbvCode(body);
        console.log('getHomeIDFromTBV' + getHomeIDFromTBV)
        if (!getHomeIDFromTBV) throw new StatusException(
            {
                error: this.errMessageUtilsTh.errHomeIDNotInDataBase
                , result: null
                , message: this.errMessageUtilsTh.errHomeIDNotInDataBase
                , statusCode: 200
            }, 200)
        const getCartype = await this.vsActionCheckEmployee.checkCartypeCategory(body);
        if (!getCartype) throw new StatusException(
            {
                error: this.errMessageUtilsTh.errCartypeCategoryNotInbase
                , result: null
                , message: this.errMessageUtilsTh.errCartypeCategoryNotInbase
                , statusCode: 200
            }, 200
        )
        const getHomeID = await this.vsActionCheckHomeID.CheckHomeID(body, getHomeIDFromTBV);
        if (await getHomeID) {

            return await this.bActionINService.saveBookingIn(body, imagesNameObj, getHomeID, checkTBVCode, getEmployeeID,getCartype);
        } else throw new StatusException(
            {
                error: this.errMessageUtilsTh.errHomeIDNotInDataBase
                , result: null
                , message: this.errMessageUtilsTh.errHomeIDNotInDataBase
                , statusCode: 200
            }, 200
        )
    }
}
