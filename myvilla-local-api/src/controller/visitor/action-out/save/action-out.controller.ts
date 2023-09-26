import { configfile } from '../../../../conf/config-setting';
import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import {
  editFileName,
  getCurrentDatePathFileSave,
  imageFileFilter,
} from 'src/middleware/image_manual/uploadfile.middleware';
import { diskStorage } from 'multer';
import { ActionOutSaveService } from './action-out.service';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { VsActionOutSlotOrCardMiddleWare } from 'src/middleware/visitor/action-out/save/vs_action_out_slotorcard.middleware';
import { VsActionOutForSaveMiddleWare } from 'src/middleware/visitor/action-out/save/vs_action_out_forsave.middleware';
import { ActionOutInterceptor } from 'src/interceptor/visitor/action-out/action-out.interceptor';
import { vsActionOutVerifyEstampMiddleware } from 'src/middleware/visitor/action-out/estamp-verify/vs_action_out_estamp_verify.middleware';
import { DefaultInterceptor } from 'src/interceptor/default/default.interceptor';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ActionOutValuesInterceptor } from 'src/interceptor/visitor/action-out/action-out-values.interceptor';

@Controller('bannayuu/api/visitor/action/out')
export class ActionOutSaveController {
  constructor(
    private readonly saveOutService: ActionOutSaveService,
    private readonly errMessageUtilsTh: ErrMessageUtilsTH,
    private readonly vsactionOutSlotOrCardMid: VsActionOutSlotOrCardMiddleWare,
    private readonly vsactionOutForSaveMid: VsActionOutForSaveMiddleWare,
    private readonly vsactionOutVerifyEstamMiddleware: vsActionOutVerifyEstampMiddleware,
  ) {}

  @Post('save')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    ActionOutInterceptor,
    FileFieldsInterceptor(
      [
        { name: 'image_vehicle', maxCount: 1 },
        // , { name: 'image_license', maxCount: 1 }
      ],
      {
        storage: diskStorage({
          destination: getCurrentDatePathFileSave,
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
        limits: { fileSize: 1024 * 1024 * configfile.IMAGE_SIZE },
      },
    ),
    DefaultInterceptor,
    ActionOutValuesInterceptor,
  )
  async ActionSaveOut(@UploadedFiles() files, @Body() body) {
    console.log('Files' + JSON.stringify(files));
    const pathMain = configfile.PATHSAVEIMAGE;
    if (!files.image_vehicle) {
      throw new StatusException(
        {
          error: this.errMessageUtilsTh.errImageVehicleNotFound,
          result: null,
          message: this.errMessageUtilsTh.errImageVehicleNotFound,
          statusCode: 200,
          slip_info: null,
        },
        200,
      );
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
    const pathDriver = files.image_vehicle.map((file) => {
      return file.path.replace(pathMain, '');
    });

    // const pathLicense = files.image_vehicle.map(file => {
    //     return file.path.replace(pathMain, '');
    // })

    const imagesNameObj = {
      image_vehicle: pathDriver[0],
      // , image_license: pathLicense[0]
    };
    //---------------------Middle ware
    const middlewareSaveOut = await this.vsactionOutForSaveMid.CheckVisitorOut(
      body,
    );
    if (middlewareSaveOut)
      throw new StatusException(
        {
          error: middlewareSaveOut,
          result: null,
          message: middlewareSaveOut,
          statusCode: 200,
          slip_info: null,
        },
        200,
      );
    const middlewareSlotOrCardSaveOut = await this.vsactionOutSlotOrCardMid.CheckVisitorOut(
      body,
    );
    if (middlewareSlotOrCardSaveOut)
      throw new StatusException(
        {
          error: middlewareSlotOrCardSaveOut,
          result: null,
          message: middlewareSlotOrCardSaveOut,
          statusCode: 200,
          slip_info: null,
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

    const middlewareCalculateLog = await this.vsactionOutSlotOrCardMid.CheckCalculateLog(
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

    const middlewareEstampVerify = await this.vsactionOutVerifyEstamMiddleware.checkValues(
      body,
    );
    if (middlewareEstampVerify)
      throw new StatusException(
        {
          error: middlewareEstampVerify,
          result: null,
          message: middlewareEstampVerify,
          statusCode: 200,
          slip_info: null,
        },
        200,
      );
    return this.saveOutService.saveActionOut(imagesNameObj, body);
  }
}
