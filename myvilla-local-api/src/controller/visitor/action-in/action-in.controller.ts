import { configfile } from '../../../conf/config-setting';
import {
  Body,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ActionInService } from './action-in.service';
import { diskStorage } from 'multer';
import * as moment from 'moment';
import {
  editFileName,
  getCurrentDatePathFileSave,
  imageFileFilter,
} from 'src/middleware/image_manual/uploadfile.middleware';
import { VsActionInSaveMiddleware } from 'src/middleware/visitor/action-in/vs_action_in_save.middleware';
import { VsActionInInfoMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_info.middleware';
import { VsActionInCheckSlotMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_checkslot.middleware';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { VsActionInCheckHomeIDMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_checkhomeid.middleware';
import { VsActionInCheckEmployeeMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_check_employee.middleware';
import { ActionInInterceptor } from 'src/interceptor/visitor/action-in/action-in.interceptor';
import { LoadSettingLocalUtils } from 'src/utils/load_setting_local.utils';
import { DefaultInterceptor } from 'src/interceptor/default/default.interceptor';
import { OverwritingRemarkImages } from 'src/middleware/image_manual/watermark/image-watermark.middleware';

@Controller('bannayuu/api/visitor/action/in')
export class ActionInController {
  constructor(
    private readonly actionINService: ActionInService,
    private readonly errMessageUtilsTh: ErrMessageUtilsTH,
    private readonly vsActionCheckMiddleware: VsActionInCheckSlotMiddleWare,
    private readonly vsActionInforMiddleware: VsActionInInfoMiddleWare,
    private readonly vsActionSaveIn: VsActionInSaveMiddleware,
    private readonly vsActionCheckHomeID: VsActionInCheckHomeIDMiddleWare,
    private readonly vsActionCheckEmployee: VsActionInCheckEmployeeMiddleWare,
    private readonly loadSettingLocalUtils: LoadSettingLocalUtils,
  ) {}

  @Post('save')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    ActionInInterceptor,
    FileFieldsInterceptor(
      [
        { name: 'image_card', maxCount: 1 },
        { name: 'image_vehicle', maxCount: 1 },
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
  )
  async ActionSaveIn(@UploadedFiles() files, @Body() body) {
    console.log('Files' + JSON.stringify(files));
    console.log('Body' + JSON.stringify(body));

    const pathMain = configfile.PATHSAVEIMAGE;
    if (!files.image_card) {
      throw new StatusException(
        {
          error: this.errMessageUtilsTh.errImageCardNotFound,
          result: null,
          message: this.errMessageUtilsTh.errImageCardNotFound,
          statusCode: 200,
        },
        200,
      );
    } else if (!files.image_vehicle) {
      throw new StatusException(
        {
          error: this.errMessageUtilsTh.errImageVehicleNotFound,
          result: null,
          message: this.errMessageUtilsTh.errImageVehicleNotFound,
          statusCode: 200,
        },
        200,
      );
    }
    const pathDriver = files.image_card.map((file) => {
      return file.path.replace(pathMain, '');
    });
    const pathLicense = files.image_vehicle.map((file) => {
      return file.path.replace(pathMain, '');
    });

    // overwriting images
    OverwritingRemarkImages(files.image_card)
    OverwritingRemarkImages(files.image_vehicle)

    const imagesNameObj = {
      image_card: pathDriver[0],
      image_vehicle: pathLicense[0],
    };
    //---------------------Middle ware
    let VisitorInfo = null;
    const setupCompany = await this.loadSettingLocalUtils.getVisitorInMode(
      body.company_id,
    );
    if (setupCompany?.visitor_verify === 'identitycard')
      VisitorInfo = this.vsActionInforMiddleware.CheclVisitorinfo(body);
    const VisitorSaveIn = this.vsActionSaveIn.CheckSaveIn(body);
    const VisitorValues = await this.vsActionCheckMiddleware.CheckActionIN(
      body,
    );

    if (VisitorInfo) {
      throw new StatusException(
        {
          error: VisitorInfo,
          result: null,
          message: VisitorInfo,
          statusCode: 200,
        },
        200,
      );
    } else if (VisitorSaveIn) {
      throw new StatusException(
        {
          error: VisitorSaveIn,
          result: null,
          message: VisitorSaveIn,
          statusCode: 200,
        },
        200,
      );
    } else if (VisitorValues) {
      throw new StatusException(
        {
          error: VisitorValues,
          result: null,
          message: VisitorValues,
          statusCode: 200,
        },
        200,
      );
    } else {
      const getEmployeeID = await this.vsActionCheckEmployee.CheckInEmployee(
        body,
      );
      if (!getEmployeeID)
        throw new StatusException(
          {
            error: this.errMessageUtilsTh.errEmployeeIDNotInDatabase,
            result: null,
            message: this.errMessageUtilsTh.errEmployeeIDNotInDatabase,
            statusCode: 200,
          },
          200,
        );
      const getCartype = await this.vsActionCheckEmployee.checkCartypeCategory(
        body,
      );
      if (!getCartype)
        throw new StatusException(
          {
            error: this.errMessageUtilsTh.errCartypeCategoryNotInbase,
            result: null,
            message: this.errMessageUtilsTh.errCartypeCategoryNotInbase,
            statusCode: 200,
          },
          200,
        );
      const getHomeID = await this.vsActionCheckHomeID.CheckHomeID(
        body,
        body.home_id,
      );
      if (await getHomeID) {
        return await this.getSlotOrGetCard(
          imagesNameObj,
          body,
          getHomeID,
          getEmployeeID,
          getCartype,
          setupCompany?.line_notification_mode,
        );
      } else
        throw new StatusException(
          {
            error: this.errMessageUtilsTh.errHomeIDNotInDataBase,
            result: null,
            message: this.errMessageUtilsTh.errHomeIDNotInDataBase,
            statusCode: 200,
          },
          200,
        );
    }
  }

  async getSlotOrGetCard(
    files: any,
    @Body() body,
    getHomeID: any,
    getEmployeeID: any,
    getCartype: any,
    lineNotificationMode: string,
  ) {
    console.log('Get slot Or Get Card');
    const visitorInfo = JSON.parse(body.visitor_info);
    const notiReq = {
      m_home_id: body && body.home_id,
      m_company_id: body && body.company_id,
      m_contact_name:
        visitorInfo &&
        `${visitorInfo.first_name_th} ${visitorInfo.last_name_th}`,
      m_contact_licenseplate: body && body.license_plate,
      m_contact_time_in: moment().format('YYYY-MM-DD HH:mm:ss'),
      m_path_img: files && files.image_vehicle ? files.image_vehicle : null,
    };

    console.log('notiReq' + JSON.stringify(notiReq));
    if (body.visitor_slot_number) {
      console.log('Get slot');
      const getVisitorSlotID = await this.actionINService.getVisitorSlotID(
        body,
      );
      if (getVisitorSlotID) {
        console.log(notiReq);
        const notiRes = await this.actionINService.SendLineNotificationActionIn(
          notiReq,
          lineNotificationMode,
        );
        console.log('line notifycation response : ' + JSON.stringify(notiRes));
        return this.actionINService.ActionSaveIn(
          files,
          body,
          getVisitorSlotID[0].visitor_slot_id,
          null,
          getHomeID,
          getEmployeeID,
          getCartype,
        );
      }

      throw new StatusException(
        {
          error: getVisitorSlotID.error,
          result: null,
          message: this.errMessageUtilsTh.errGetSlotVisitorNumberIsFail,
          statusCode: 200,
        },
        200,
      );
    }

    const getCardID = await this.actionINService.getCardID(body);
    console.log('Get Card' + JSON.stringify(getCardID));
    if (getCardID) {
      console.log(notiReq);
      const notiRes = await this.actionINService.SendLineNotificationActionIn(
        notiReq,
        lineNotificationMode,
      );
      console.log('line notifycation response : ' + JSON.stringify(notiRes));
      return this.actionINService.ActionSaveIn(
        files,
        body,
        null,
        getCardID,
        getHomeID,
        getEmployeeID,
        getCartype,
      );
    }

    throw new StatusException(
      {
        error: this.errMessageUtilsTh.errGetCardIDIsFail,
        result: null,
        message: this.errMessageUtilsTh.errGetCardIDIsFail,
        statusCode: 200,
      },
      200,
    );
  }
}
