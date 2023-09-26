"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitorSaveCardlossController = void 0;
const config_setting_1 = require("../../../../conf/config-setting");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const uploadfile_middleware_1 = require("../../../../middleware/image_manual/uploadfile.middleware");
const visitor_save_cardloss_service_1 = require("./visitor-save-cardloss.service");
const multer_1 = require("multer");
const cardloss_interceptor_1 = require("../../../../interceptor/visitor/cardloss/cardloss.interceptor");
const callback_status_1 = require("../../../../utils/callback.status");
const err_message_th_utils_1 = require("../../../../utils/err_message_th.utils");
const vs_card_loss_save_middleware_1 = require("../../../../middleware/visitor/card-loss/save/vs_card_loss_save.middleware");
const vs_action_in_check_employee_middleware_1 = require("../../../../middleware/visitor/action-in/vs_action_in_check_employee.middleware");
const default_interceptor_1 = require("../../../../interceptor/default/default.interceptor");
const jwt_auth_guard_1 = require("../../../../auth/jwt-auth.guard");
const action_out_values_interceptor_1 = require("../../../../interceptor/visitor/action-out/action-out-values.interceptor");
let VisitorSaveCardlossController = class VisitorSaveCardlossController {
    constructor(visitorCardlossService, errMessageUtilsTh, VsCardLossSaveMiddleware, vsActionInCheckEmployeeMiddleware) {
        this.visitorCardlossService = visitorCardlossService;
        this.errMessageUtilsTh = errMessageUtilsTh;
        this.VsCardLossSaveMiddleware = VsCardLossSaveMiddleware;
        this.vsActionInCheckEmployeeMiddleware = vsActionInCheckEmployeeMiddleware;
    }
    async saveCardLoss(files, body) {
        console.log('Files' + JSON.stringify(files));
        const pathMain = config_setting_1.configfile.PATHSAVEIMAGE;
        if (!files.image_customer) {
            throw new callback_status_1.StatusException({
                error: this.errMessageUtilsTh.errImageCustomerNotFound,
                result: null,
                message: this.errMessageUtilsTh.errImageCustomerNotFound,
                statusCode: 200
            }, 200);
        }
        const pathCustomer = files.image_customer.map(file => {
            return file.path.replace(pathMain, '');
        });
        const imagesNameObj = {
            image_customer: pathCustomer[0]
        };
        const middlewareSaveCardLoss = this.VsCardLossSaveMiddleware.checkValues(body);
        if (middlewareSaveCardLoss)
            throw new callback_status_1.StatusException({
                error: middlewareSaveCardLoss,
                result: null,
                message: middlewareSaveCardLoss,
                statusCode: 200
            }, 200);
        const employeeObj = await this.vsActionInCheckEmployeeMiddleware.CheckOutEmployee(body);
        if (employeeObj)
            return await this.visitorCardlossService.saveCardloss(body, imagesNameObj, employeeObj);
        else
            throw new callback_status_1.StatusException({
                error: this.errMessageUtilsTh.errEmployeeInfoNotFound,
                result: null,
                message: this.errMessageUtilsTh.errEmployeeInfoNotFound,
                statusCode: 200
            }, 200);
    }
    async saveCardLossNotOut(files, body) {
        console.log('Files' + JSON.stringify(files));
        const pathMain = config_setting_1.configfile.PATHSAVEIMAGE;
        if (!files.image_customer) {
            throw new callback_status_1.StatusException({
                error: this.errMessageUtilsTh.errImageCustomerNotFound,
                result: null,
                message: this.errMessageUtilsTh.errImageCustomerNotFound,
                statusCode: 200
            }, 200);
        }
        const pathCustomer = files.image_customer.map(file => {
            return file.path.replace(pathMain, '');
        });
        const imagesNameObj = {
            image_customer: pathCustomer[0]
        };
        const middlewareSaveCardLoss = this.VsCardLossSaveMiddleware.checkValues(body);
        if (middlewareSaveCardLoss)
            throw new callback_status_1.StatusException({
                error: middlewareSaveCardLoss,
                result: null,
                message: middlewareSaveCardLoss,
                statusCode: 200
            }, 200);
        const middlewareForCheckCardBefore = await this.VsCardLossSaveMiddleware.checkCardBefore(body);
        if (middlewareForCheckCardBefore)
            throw new callback_status_1.StatusException({
                error: middlewareForCheckCardBefore,
                result: null,
                message: middlewareForCheckCardBefore,
                statusCode: 200
            }, 200);
        const employeeObj = await this.vsActionInCheckEmployeeMiddleware.CheckOutEmployee(body);
        if (employeeObj)
            return await this.visitorCardlossService.saveCardlossNotOut(body, imagesNameObj, employeeObj);
        else
            throw new callback_status_1.StatusException({
                error: this.errMessageUtilsTh.errEmployeeInfoNotFound,
                result: null,
                message: this.errMessageUtilsTh.errEmployeeInfoNotFound,
                statusCode: 200
            }, 200);
    }
};
__decorate([
    common_1.Post('saveandout'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.UseInterceptors(cardloss_interceptor_1.CardLossInterceptor, platform_express_1.FileFieldsInterceptor([
        { name: 'image_customer', maxCount: 1 }
    ], {
        storage: multer_1.diskStorage({
            destination: uploadfile_middleware_1.getCurrentDatePathFileSave,
            filename: uploadfile_middleware_1.editFileName,
        }),
        fileFilter: uploadfile_middleware_1.imageFileFilter,
        limits: { fileSize: 1024 * 1024 * config_setting_1.configfile.IMAGE_SIZE }
    }), default_interceptor_1.DefaultInterceptor, action_out_values_interceptor_1.ActionOutValuesInterceptor),
    __param(0, common_1.UploadedFiles()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VisitorSaveCardlossController.prototype, "saveCardLoss", null);
__decorate([
    common_1.Post('savenotout'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.UseInterceptors(cardloss_interceptor_1.CardLossInterceptor, platform_express_1.FileFieldsInterceptor([
        { name: 'image_customer', maxCount: 1 }
    ], {
        storage: multer_1.diskStorage({
            destination: uploadfile_middleware_1.getCurrentDatePathFileSave,
            filename: uploadfile_middleware_1.editFileName,
        }),
        fileFilter: uploadfile_middleware_1.imageFileFilter,
        limits: { fileSize: 1024 * 1024 * config_setting_1.configfile.IMAGE_SIZE }
    }), default_interceptor_1.DefaultInterceptor, action_out_values_interceptor_1.ActionOutValuesInterceptor),
    __param(0, common_1.UploadedFiles()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VisitorSaveCardlossController.prototype, "saveCardLossNotOut", null);
VisitorSaveCardlossController = __decorate([
    common_1.Controller('bannayuu/api/visitor/cardloss/save-cardloss'),
    __metadata("design:paramtypes", [visitor_save_cardloss_service_1.VisitorSaveCardlossService,
        err_message_th_utils_1.ErrMessageUtilsTH,
        vs_card_loss_save_middleware_1.vsCardLossSaveMiddleware,
        vs_action_in_check_employee_middleware_1.VsActionInCheckEmployeeMiddleWare])
], VisitorSaveCardlossController);
exports.VisitorSaveCardlossController = VisitorSaveCardlossController;
//# sourceMappingURL=visitor-save-cardloss.controller.js.map