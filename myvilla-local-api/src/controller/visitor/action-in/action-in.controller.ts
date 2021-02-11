import 'dotenv/config';
import { Body, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ActionInService } from './action-in.service';
import { diskStorage } from 'multer';
import { editFileName, getCurrentDatePathFileSaveIn, imageFileFilter } from 'src/middleware/image_manual/uploadfile.middleware';
import { VsActionInSaveMiddleware } from 'src/middleware/visitor/action-in/vs_action_in_save.middleware';
import { VsActionInInfoMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_info.middleware';
import { VsActionInCheckSlotMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_checkslot.middleware';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { VsActionInCheckHomeIDMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_checkhomeid.middleware';
import { VsActionInCheckEmployeeMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_check_employee.middleware';
@Controller('bannayuu/api/visitor/action/in')
export class ActionInController {
    constructor(
        private readonly actionINService: ActionInService
        , private readonly errMessageUtilsTh: ErrMessageUtilsTH
        , private readonly vsActionCheckMiddleware: VsActionInCheckSlotMiddleWare
        , private readonly vsActionInforMiddleware: VsActionInInfoMiddleWare
        , private readonly vsActionSaveIn: VsActionInSaveMiddleware
        , private readonly vsActionCheckHomeID: VsActionInCheckHomeIDMiddleWare
        , private readonly vsActionCheckEmployee: VsActionInCheckEmployeeMiddleWare
    ) { }
    // @UseGuards(JwtAuthGuard)
    @Post('save')
    @UseInterceptors(
        FileFieldsInterceptor([
            {name:'image_card',maxCount:1}
            ,{name:'image_vehicle',maxCount:1}
        ],{
            storage: diskStorage({
                destination: getCurrentDatePathFileSaveIn,
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
    async ActionSaveIn(@UploadedFiles() files, @Body() body) {
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
        }else if(!files.image_vehicle){
            throw new StatusException(
                {
                    error: this.errMessageUtilsTh.errImageVehicleNotFound
                    , result: null
                    , message: this.errMessageUtilsTh.errImageVehicleNotFound
                    , statusCode: 400
                }, 400
            )
        }
        const pathDriver = files.image_card.map(file=>{
            return file.path.replace(pathMain,'');
        })
        console.log(pathDriver);
        const pathLicense = files.image_vehicle.map(file=>{
            return file.path.replace(pathMain,'');
        })
        console.log(pathLicense);
        const imagesNameObj = {
            image_card:pathDriver[0]
            ,image_vehicle:pathLicense[0]   
        }
        //---------------------Middle ware
        const VisitorInfo = this.vsActionInforMiddleware.CheclVisitorinfo(body);
        const VisitorSaveIn = this.vsActionSaveIn.CheckSaveIn(body);
        const VisitorValues = await this.vsActionCheckMiddleware.CheckActionIN(body);

        if (VisitorInfo) {
            throw new StatusException(
                {
                    error: VisitorInfo
                    , result: null
                    , message: VisitorInfo
                    , statusCode: 400
                }, 400
            )
        } else if (VisitorSaveIn) {
            throw new StatusException(
                {
                    error: VisitorSaveIn
                    , result: null
                    , message: VisitorSaveIn
                    , statusCode: 400
                }, 400
            )
        } else if (VisitorValues) {
            throw new StatusException(
                {
                    error: VisitorValues
                    , result: null
                    , message: VisitorValues
                    , statusCode: 400
                }, 400
            )
        } else {
            const getEmployeeID = await this.vsActionCheckEmployee.CheckEmployee(body);
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
                return await this.getSlotOrGetCard(imagesNameObj, body, getHomeID);
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


    async getSlotOrGetCard(files: any, @Body() body, getHomeID: any) {
        console.log('Get slot Or Get Card');
        if (body.visitor_slot_number) {
            console.log('Get slot');
            const getVisitorSlotID = await this.actionINService.getVisitorSlotID(body);
            if (getVisitorSlotID)
                return this.actionINService.ActionSaveIn(files, body, getVisitorSlotID[0].visitor_slot_id, null, getHomeID);
            throw new StatusException(
                {
                    error: getVisitorSlotID.error
                    , result: null
                    , message: this.errMessageUtilsTh.errGetSlotVisitorNumberIsFail
                    , statusCode: 400
                }, 400
            )
        }
        console.log('Get Card');
        const getCardID = await this.actionINService.getCardID(body);
        if (getCardID)
            return this.actionINService.ActionSaveIn(files, body, null, getCardID[0], getHomeID);
        throw new StatusException(
            {
                error: getCardID.error
                , result: null
                , message: this.errMessageUtilsTh.errGetCardIDIsFail
                , statusCode: 400
            }, 400
        )
    }
}
