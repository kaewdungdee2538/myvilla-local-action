import {configfile} from '../../../../conf/config-setting'
import { Body, Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { editFileName, getCurrentDatePathFileSave, imageFileFilter } from 'src/middleware/image_manual/uploadfile.middleware';
import { VisitorSaveCardlossService } from './visitor-save-cardloss.service';
import { diskStorage } from 'multer';
import { CardLossInterceptor } from 'src/interceptor/visitor/cardloss/cardloss.interceptor';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { vsCardLossSaveMiddleware } from 'src/middleware/visitor/card-loss/save/vs_card_loss_save.middleware';
import { VsActionInCheckEmployeeMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_check_employee.middleware';
import { DefaultInterceptor } from 'src/interceptor/default/default.interceptor';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('bannayuu/api/visitor/cardloss/save-cardloss')
export class VisitorSaveCardlossController {
    constructor(
        private readonly visitorCardlossService: VisitorSaveCardlossService,
        private readonly errMessageUtilsTh: ErrMessageUtilsTH,
        private readonly VsCardLossSaveMiddleware: vsCardLossSaveMiddleware
        , private readonly vsActionInCheckEmployeeMiddleware: VsActionInCheckEmployeeMiddleWare
    ) { }

    @Post('saveandout')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        CardLossInterceptor,
        FileFieldsInterceptor([
            { name: 'image_customer', maxCount: 1 }
        ], {
            storage: diskStorage({
                destination: getCurrentDatePathFileSave,
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
            limits:{fileSize: 1024*1024*5}
        }),
        DefaultInterceptor
    )
    async saveCardLoss(@UploadedFiles() files, @Body() body) {
        console.log('Files' + JSON.stringify(files));
        const pathMain = configfile.PATHSAVEIMAGE;
        if (!files.image_customer) {
            throw new StatusException(
                {
                    error: this.errMessageUtilsTh.errImageCustomerNotFound
                    , result: null
                    , message: this.errMessageUtilsTh.errImageCustomerNotFound
                    , statusCode: 200
                },200
            )
        }
        const pathCustomer = files.image_customer.map(file => {
            return file.path.replace(pathMain, '');
        })

        const imagesNameObj = {
            image_customer: pathCustomer[0]
        }
        //---------------------Middle ware
        const middlewareSaveCardLoss = this.VsCardLossSaveMiddleware.checkValues(body);
        if (middlewareSaveCardLoss)
            throw new StatusException(
                {
                    error: middlewareSaveCardLoss
                    , result: null
                    , message: middlewareSaveCardLoss
                    , statusCode: 200
                }, 200
            )
        const employeeObj = await this.vsActionInCheckEmployeeMiddleware.CheckOutEmployee(body)
        if (employeeObj)
            //---------------------Save
            return await this.visitorCardlossService.saveCardloss(body, imagesNameObj, employeeObj);
        else throw new StatusException(
            {
                error: this.errMessageUtilsTh.errEmployeeInfoNotFound
                , result: null
                , message: this.errMessageUtilsTh.errEmployeeInfoNotFound
                , statusCode: 200
            }, 200)

    }

    @Post('savenotout')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        CardLossInterceptor,
        FileFieldsInterceptor([
            { name: 'image_customer', maxCount: 1 }
        ], {
            storage: diskStorage({
                destination: getCurrentDatePathFileSave,
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
        DefaultInterceptor
    )
    async saveCardLossNotOut(@UploadedFiles() files, @Body() body) {
        console.log('Files' + JSON.stringify(files));
        const pathMain = configfile.PATHSAVEIMAGE;
        if (!files.image_customer) {
            throw new StatusException(
                {
                    error: this.errMessageUtilsTh.errImageCustomerNotFound
                    , result: null
                    , message: this.errMessageUtilsTh.errImageCustomerNotFound
                    , statusCode: 200
                }, 200
            )
        }
        const pathCustomer = files.image_customer.map(file => {
            return file.path.replace(pathMain, '');
        })

        const imagesNameObj = {
            image_customer: pathCustomer[0]
        }
        //---------------------Middle ware
        const middlewareSaveCardLoss = this.VsCardLossSaveMiddleware.checkValues(body);
        if (middlewareSaveCardLoss)
            throw new StatusException(
                {
                    error: middlewareSaveCardLoss
                    , result: null
                    , message: middlewareSaveCardLoss
                    , statusCode: 200
                }, 200
            )
        const middlewareForCheckCardBefore = await this.VsCardLossSaveMiddleware.checkCardBefore(body);
        if (middlewareForCheckCardBefore)
            throw new StatusException(
                {
                    error: middlewareForCheckCardBefore
                    , result: null
                    , message: middlewareForCheckCardBefore
                    , statusCode: 200
                }, 200
            )
        const employeeObj = await this.vsActionInCheckEmployeeMiddleware.CheckOutEmployee(body)
        if (employeeObj)
            //---------------------Save
            return await this.visitorCardlossService.saveCardlossNotOut(body, imagesNameObj,employeeObj);
        else throw new StatusException(
            {
                error: this.errMessageUtilsTh.errEmployeeInfoNotFound
                , result: null
                , message: this.errMessageUtilsTh.errEmployeeInfoNotFound
                , statusCode: 200
            }, 200)
    }

}
