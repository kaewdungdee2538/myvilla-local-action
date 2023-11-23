import {
  Req,
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  editFileName,
  getCurrentDatePathFileSave,
  imageFileFilter,
} from 'src/middleware/image_manual/uploadfile.middleware';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { DefaultInterceptor } from 'src/interceptor/default/default.interceptor';
import {BasicAuthenInterceptor} from 'src/interceptor/auth/basic-auth.interceptor'
import { LPRByPassSaveOutInterceptor } from 'src/interceptor/lpr/bypass/lpr-bypass-save-out.interceptor';
import { configfile } from '../../../conf/config-setting';
import { BActionOutMiddleware } from 'src/middleware/booking/action-out/b_action_out.middleware';
import { bGetBookingOutInfoMiddleware } from 'src/middleware/booking/get-booking-out-info/b_get_booking_out_info.middleware';
import { VsActionInCheckEmployeeMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_check_employee.middleware';
import { vsActionOutVerifyEstampMiddleware } from 'src/middleware/visitor/action-out/estamp-verify/vs_action_out_estamp_verify.middleware';
import { BypassService } from './bypass.service';

@Controller('bannayuu/api/lpr/bypass/save-out')
export class BypassController {
  constructor(
    private readonly errMessageUtilsTh: ErrMessageUtilsTH,
    private readonly bgetBookingOutInfoMiddleware: bGetBookingOutInfoMiddleware,
    private readonly bActionOutMiddleware: BActionOutMiddleware,
    private readonly vsActionInCheckEmployeeMiddleware: VsActionInCheckEmployeeMiddleWare,
    private readonly vsactionOutVerifyEstamMiddleware: vsActionOutVerifyEstampMiddleware,
    private readonly bypassService: BypassService,
  ) {}

  @Post('save')
  @UseInterceptors(
    BasicAuthenInterceptor,
    LPRByPassSaveOutInterceptor,
    FileFieldsInterceptor([{ name: 'image_vehicle', maxCount: 1 }], {
      storage: diskStorage({
        destination: getCurrentDatePathFileSave,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      limits: { fileSize: 1024 * 1024 * configfile.IMAGE_SIZE },
    }),
    DefaultInterceptor,
  )
  async saveLPROutByPass(@UploadedFiles() files, @Body() body,@Req() request) {
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
    //---------------------Middle ware
    const tbvCodeMiddleware = await this.bActionOutMiddleware.CheckSaveOutLPRByPass(
      body,
    );
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

      //--------------------check calculate
      const resRecordIn = await this.bypassService.getRecordInWithLPR(body);
      // when after cal has parking_amount > 0
      if(resRecordIn.summary_data.sum_total > 0){
        throw new StatusException(
            {
              error: this.errMessageUtilsTh.errNotPay,
              result: null,
              message: this.errMessageUtilsTh.errNotPay,
              statusCode: 200,
            },
            200,
          );
      }
      if (resRecordIn && resRecordIn.action_in_type == 'BOOKING') {
        //-----------เช็ค setting ว่าเปิดระบบให้เป็นแบบตรวจสอบ Estamp ก่อนถึงออกจากระบบได้หรือไม่ สำหรับ BOOKING
        const middlewareEstampVerifyBooking = await this.bgetBookingOutInfoMiddleware.checkBookingOutEstamp(resRecordIn);
        if (middlewareEstampVerifyBooking) {
          throw new StatusException(
            {
              error: middlewareEstampVerifyBooking,
              result: null,
              message: middlewareEstampVerifyBooking,
              statusCode: 200,
            },
            200,
          );
        }
      } else if (resRecordIn && resRecordIn.action_in_type == 'VISITOR') {
        //-----------เช็ค setting ว่าเปิดระบบให้เป็นแบบตรวจสอบ Estamp ก่อนถึงออกจากระบบได้หรือไม่ สำหรับ VISITOR
        const middlewareEstampVerifyVisitor = await this.vsactionOutVerifyEstamMiddleware.checkValues(resRecordIn);
          if (middlewareEstampVerifyVisitor)
            throw new StatusException(
              {
                error: middlewareEstampVerifyVisitor,
                result: null,
                message: middlewareEstampVerifyVisitor,
                statusCode: 200,
                slip_info: null,
              },
              200,
            );
      } else {
        throw new StatusException(
          {
            error: this.errMessageUtilsTh.errLicensePlateOutFailed,
            result: null,
            message: this.errMessageUtilsTh.errLicensePlateOutFailed,
            statusCode: 200,
          },
          200,
        );
      }
      //--------------------Save Out
      const authenticatedUser = request['user']; // Assuming the user property is set in the interceptor
      const employeeObj = {
        employee_type:'BASIC_AUTHEN',
        ...authenticatedUser
      }
      return this.bypassService.saveOutByPass(body, imagesNameObj, employeeObj,resRecordIn);
  }
}
