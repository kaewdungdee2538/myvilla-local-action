import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { editFileName, getCurrentDatePathFileSave, imageFileFilter } from 'src/middleware/image_manual/uploadfile.middleware';
import { VisitorSaveCardlossService } from './visitor-save-cardloss.service';
import { diskStorage } from 'multer';
import { CardLossInterceptor } from 'src/interceptor/visitor/cardloss/cardloss.interceptor';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { vsCardLossSaveMiddleware } from 'src/middleware/visitor/card-loss/save/vs_card_loss_save.middleware';
import { VsActionInCheckEmployeeMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_check_employee.middleware';

@Controller('bannayuu/api/visitor/cardloss/save-cardloss')
export class VisitorSaveCardlossController {
    constructor(
        private readonly visitorCardlossService: VisitorSaveCardlossService,
        private readonly errMessageUtilsTh: ErrMessageUtilsTH,
        private readonly VsCardLossSaveMiddleware: vsCardLossSaveMiddleware
        , private readonly vsActionInCheckEmployeeMiddleware: VsActionInCheckEmployeeMiddleWare
    ) { }
    @Post('saveandout')
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
        })
    )
    async saveCardLoss(@UploadedFiles() files, @Body() body) {
        console.log('Files' + JSON.stringify(files));
        const pathMain = process.env.PATHSAVEIMAGE;
        if (!files.image_customer) {
            throw new StatusException(
                {
                    error: this.errMessageUtilsTh.errImageCustomerNotFound
                    , result: null
                    , message: this.errMessageUtilsTh.errImageCustomerNotFound
                    , statusCode: 400
                }, 400
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
                    , statusCode: 400
                }, 400
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
                , statusCode: 400
            }, 400)

    }

    @Post('savenotout')
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
        })
    )
    async saveCardLossNotOut(@UploadedFiles() files, @Body() body) {
        console.log('Files' + JSON.stringify(files));
        const pathMain = process.env.PATHSAVEIMAGE;
        if (!files.image_customer) {
            throw new StatusException(
                {
                    error: this.errMessageUtilsTh.errImageCustomerNotFound
                    , result: null
                    , message: this.errMessageUtilsTh.errImageCustomerNotFound
                    , statusCode: 400
                }, 400
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
                    , statusCode: 400
                }, 400
            )
        const middlewareForCheckCardBefore = await this.VsCardLossSaveMiddleware.checkCardBefore(body);
        if (middlewareForCheckCardBefore)
            throw new StatusException(
                {
                    error: middlewareForCheckCardBefore
                    , result: null
                    , message: middlewareForCheckCardBefore
                    , statusCode: 400
                }, 400
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
                , statusCode: 400
            }, 400)
    }

}
