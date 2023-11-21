import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  editFileName,
  getCurrentDatePathFileSave,
  imageFileFilter,
} from 'src/middleware/image_manual/uploadfile.middleware';
import { diskStorage } from 'multer';
import { BActionOutInterceptor } from 'src/interceptor/booking/actionout/b-action-out.interceptor';
import { StatusException } from 'src/utils/callback.status';
import { BActionOutService } from './b-action-out.service';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { LoadSettingLocalUtils } from 'src/utils/load_setting_local.utils';
import { bGetBookingOutInfoMiddleware } from 'src/middleware/booking/get-booking-out-info/b_get_booking_out_info.middleware';
import { BActionOutMiddleware } from 'src/middleware/booking/action-out/b_action_out.middleware';
import { VsActionInCheckEmployeeMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_check_employee.middleware';
import { VsActionOutSlotOrCardMiddleWare } from 'src/middleware/visitor/action-out/save/vs_action_out_slotorcard.middleware';
import { configfile } from '../../../conf/config-setting';
import { DefaultInterceptor } from 'src/interceptor/default/default.interceptor';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OverwritingRemarkImages } from 'src/middleware/image_manual/watermark/image-watermark.middleware';
@Controller('bannayuu/api/booking/b-action-out')
export class BActionOutController {
  constructor(
    private readonly bActionOUTService: BActionOutService,
    private readonly errMessageUtilsTh: ErrMessageUtilsTH,
    private readonly bgetBookingOutInfoMiddleware: bGetBookingOutInfoMiddleware,
    private readonly bActionOutMiddleware: BActionOutMiddleware,
    private readonly vsActionInCheckEmployeeMiddleware: VsActionInCheckEmployeeMiddleWare,
    private readonly vsactionOutSlotOrCardMid: VsActionOutSlotOrCardMiddleWare,
  ) {}

  @Post('save')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    BActionOutInterceptor,
    FileFieldsInterceptor([, { name: 'image_vehicle', maxCount: 1 }], {
      storage: diskStorage({
        destination: getCurrentDatePathFileSave,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      limits: { fileSize: 1024 * 1024 * configfile.IMAGE_SIZE },
    }),
    DefaultInterceptor,
  )
  async saveBookingSaveOut(@UploadedFiles() files, @Body() body) {
    console.log('Files' + JSON.stringify(files));
    const pathMain = configfile.PATHSAVEIMAGE;
    if (!files.image_vehicle)
      throw new StatusException(
        {
          error: this.errMessageUtilsTh.errImageVehicleNotFound,
          result: null,
          message: this.errMessageUtilsTh.errImageVehicleNotFound,
          statusCode: 200,
        },
        200,
      );
    const pathVehicle = files.image_vehicle.map((file) => {
      return file.path.replace(pathMain, '');
    });
    const imagesNameObj = {
      image_vehicle: pathVehicle[0],
    };

    // overwriting images
    OverwritingRemarkImages(files.image_vehicle)

    //---------------------Middle ware
    const tbvCodeMiddleware = await this.bActionOutMiddleware.CheckSaveOut(body);
    if (tbvCodeMiddleware)
      throw new StatusException(
        {
          error: tbvCodeMiddleware,
          result: null,
          message: tbvCodeMiddleware,
          statusCode: 200,
        },
        200,
      );

    const middlewarePaymentType = await this.vsactionOutSlotOrCardMid.checkPaymentType(
      body,
    );
    if (middlewarePaymentType)
      throw new StatusException(
        {
          error: middlewarePaymentType,
          result: null,
          message: middlewarePaymentType,
          statusCode: 200,
          slip_info: null,
        },
        200,
      );

      const middlewareCalculateLog = await this.bActionOutMiddleware.CheckCalculateLog(
        body,
      );
      if (middlewareCalculateLog)
        throw new StatusException(
          {
            error: middlewareCalculateLog,
            result: null,
            message: middlewareCalculateLog,
            statusCode: 200,
            slip_info: null,
          },
          200,
        );

    //-----------เช็ค setting ว่าเปิดระบบให้เป็นแบบตรวจสอบ Estamp ก่อนถึงออกจากระบบได้หรือไม่
    const checkEstamp = await this.bgetBookingOutInfoMiddleware.checkBookingOutEstamp(
      body,
    );
    if (checkEstamp)
      throw new StatusException(
        {
          error: checkEstamp,
          result: null,
          message: checkEstamp,
          statusCode: 200,
        },
        200,
      );
    else {
      const employeeObj = await this.vsActionInCheckEmployeeMiddleware.CheckOutEmployee(
        body,
      );
      if (employeeObj) {
        //--------------------Save Out
        return this.bActionOUTService.saveBActionOut(
          body,
          imagesNameObj,
          employeeObj,
        );
      } else
        throw new StatusException(
          {
            error: this.errMessageUtilsTh.errEmployeeInfoNotFound,
            result: null,
            message: this.errMessageUtilsTh.errEmployeeInfoNotFound,
            statusCode: 200,
          },
          200,
        );
    }
  }
}
