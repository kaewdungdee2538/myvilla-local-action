import { Body, Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BActionOutMiddleware } from 'src/middleware/booking/action-out/b_action_out.middleware';
import { bGetBookingOutInfoMiddleware } from 'src/middleware/booking/get-booking-out-info/b_get_booking_out_info.middleware';
import { VsActionInCheckEmployeeMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_check_employee.middleware';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { LptBSaveOutService } from './lpt-b-save-out.service';
import { diskStorage } from 'multer';
import { configfile } from '../../../conf/config-setting'
import { editFileName, getCurrentDatePathFileSave, imageFileFilter } from 'src/middleware/image_manual/uploadfile.middleware';
import { DefaultInterceptor } from 'src/interceptor/default/default.interceptor';
import { StatusException } from 'src/utils/callback.status';
import { LPRBSaveOutInterceptor } from 'src/interceptor/lpr/ิbooking-out/lpr-b-booking-save-out.interceptor';

@Controller('bannayuu/api/lpr/booking/save-out')
export class LptBSaveOutController {
    constructor(
        private readonly bActionOUTService: LptBSaveOutService
        , private readonly errMessageUtilsTh: ErrMessageUtilsTH
        , private readonly bgetBookingOutInfoMiddleware: bGetBookingOutInfoMiddleware
        , private readonly bActionOutMiddleware: BActionOutMiddleware
        , private readonly vsActionInCheckEmployeeMiddleware: VsActionInCheckEmployeeMiddleWare
    ) { }

    @Post('save')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        LPRBSaveOutInterceptor,
        FileFieldsInterceptor([
            , { name: 'image_vehicle', maxCount: 1 }
        ], {
            storage: diskStorage({
                destination: getCurrentDatePathFileSave,
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
            limits: { fileSize: 1024 * 1024 * configfile.IMAGE_SIZE }
        }),
        DefaultInterceptor
    )
    async saveBookingSaveOut(@UploadedFiles() files, @Body() body) {
        console.log('Files' + JSON.stringify(files));
        const pathMain = configfile.PATHSAVEIMAGE;
        if (!files.image_vehicle) throw new StatusException(
            {
                error: this.errMessageUtilsTh.errImageVehicleNotFound
                , result: null
                , message: this.errMessageUtilsTh.errImageVehicleNotFound
                , statusCode: 200
            }, 200)
        const pathVehicle = files.image_vehicle.map(file => {
            return file.path.replace(pathMain, '');
        })
        console.log(pathVehicle);
        const imagesNameObj = {
            image_vehicle: pathVehicle[0]
        }
        //---------------------Middle ware
        const tbvCodeMiddleware = await this.bActionOutMiddleware.CheckSaveIn(body);
        if (tbvCodeMiddleware) throw new StatusException(
            {
                error: tbvCodeMiddleware
                , result: null
                , message: tbvCodeMiddleware
                , statusCode: 200
            }, 200)

        //-----------เช็ค setting ว่าเปิดระบบให้เป็นแบบตรวจสอบ Estamp ก่อนถึงออกจากระบบได้หรือไม่
        const checkEstamp = await this.bgetBookingOutInfoMiddleware.checkBookingOutEstamp(body)
        if (checkEstamp) throw new StatusException(
            {
                error: checkEstamp
                , result: null
                , message: checkEstamp
                , statusCode: 200
            }, 200)
        else {
            const employeeObj = await this.vsActionInCheckEmployeeMiddleware.CheckOutEmployee(body)
            if (employeeObj) {
                //--------------------Save Out
                return this.bActionOUTService.saveBActionOut(body, imagesNameObj, employeeObj);
            }
            else throw new StatusException(
                {
                    error: this.errMessageUtilsTh.errEmployeeInfoNotFound
                    , result: null
                    , message: this.errMessageUtilsTh.errEmployeeInfoNotFound
                    , statusCode: 200
                }, 200)
        }

    }
}
