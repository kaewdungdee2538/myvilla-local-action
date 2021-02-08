import { Body, MiddlewareConsumer, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { AnyFilesInterceptor, FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ActionInService } from './action-in.service';
import { diskStorage } from 'multer';
import { editFileName, getCurrentDatePathFileSave, imageFileFilter } from 'src/middleware/image_manual/uploadfile.middleware';
import { Request, Response, NextFunction } from 'express';
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
        FilesInterceptor('image', 20, {
            storage: diskStorage({
                destination: getCurrentDatePathFileSave,
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async ActionSaveIn(@UploadedFiles() files, @Body() body) {
        console.log('Files' + JSON.stringify(files));
        if (files.length === 0) {
            throw new StatusException(
                {
                    error: this.errMessageUtilsTh.errImageNotFound
                    , result: null
                    , message: this.errMessageUtilsTh.errImageNotFound
                    , statusCode: 400
                }, 400
            )
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
            if (getHomeID) {
                const getVisitorSlotID = await this.actionINService.getVisitorSlotID(body);
                console.log(getVisitorSlotID);
                if (getVisitorSlotID)
                    return this.actionINService.ActionSaveIn(files, body, getVisitorSlotID[0].visitor_slot_id, getHomeID);
                throw new StatusException(
                    {
                        error: this.errMessageUtilsTh.errGetSlotVisitorNumberIsFail
                        , result: null
                        , message: this.errMessageUtilsTh.errGetSlotVisitorNumberIsFail
                        , statusCode: 400
                    }, 400
                )
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
}
