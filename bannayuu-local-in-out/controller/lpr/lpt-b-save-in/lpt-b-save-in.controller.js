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
exports.LptBSaveInController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../../../auth/jwt-auth.guard");
const multer_1 = require("multer");
const uploadfile_middleware_1 = require("../../../middleware/image_manual/uploadfile.middleware");
const default_interceptor_1 = require("../../../interceptor/default/default.interceptor");
const config_setting_1 = require("../../../conf/config-setting");
const callback_status_1 = require("../../../utils/callback.status");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
const vs_action_in_info_middleware_1 = require("../../../middleware/visitor/action-in/vs_action_in_info.middleware");
const vs_action_in_save_middleware_1 = require("../../../middleware/visitor/action-in/vs_action_in_save.middleware");
const b_action_in_middleware_1 = require("../../../middleware/booking/action-in/b_action_in.middleware");
const vs_action_in_checkhomeid_middleware_1 = require("../../../middleware/visitor/action-in/vs_action_in_checkhomeid.middleware");
const vs_action_in_check_employee_middleware_1 = require("../../../middleware/visitor/action-in/vs_action_in_check_employee.middleware");
const load_setting_local_utils_1 = require("../../../utils/load_setting_local.utils");
const lpr_b_booking_save_in_interceptor_1 = require("../../../interceptor/lpr/booking-in/lpr-b-booking-save-in.interceptor");
const lpt_b_save_in_service_1 = require("./lpt-b-save-in.service");
let LptBSaveInController = class LptBSaveInController {
    constructor(bActionINService, errMessageUtilsTh, vsActionInforMiddleware, vsActionSaveIn, bActionInMiddleware, vsActionCheckHomeID, vsActionCheckEmployee, loadSettingLocalUtils) {
        this.bActionINService = bActionINService;
        this.errMessageUtilsTh = errMessageUtilsTh;
        this.vsActionInforMiddleware = vsActionInforMiddleware;
        this.vsActionSaveIn = vsActionSaveIn;
        this.bActionInMiddleware = bActionInMiddleware;
        this.vsActionCheckHomeID = vsActionCheckHomeID;
        this.vsActionCheckEmployee = vsActionCheckEmployee;
        this.loadSettingLocalUtils = loadSettingLocalUtils;
    }
    async saveLPRBookingIn(files, body) {
        console.log('Files' + JSON.stringify(files));
        const pathMain = config_setting_1.configfile.PATHSAVEIMAGE;
        if (!files.image_card) {
            throw new callback_status_1.StatusException({
                error: this.errMessageUtilsTh.errImageCardNotFound,
                result: null,
                message: this.errMessageUtilsTh.errImageCardNotFound,
                statusCode: 200
            }, 200);
        }
        else if (!files.image_vehicle) {
            throw new callback_status_1.StatusException({
                error: this.errMessageUtilsTh.errImageVehicleNotFound,
                result: null,
                message: this.errMessageUtilsTh.errImageVehicleNotFound,
                statusCode: 200
            }, 200);
        }
        const pathDriver = files.image_card.map(file => {
            return file.path.replace(pathMain, '');
        });
        console.log(pathDriver);
        const pathLicense = files.image_vehicle.map(file => {
            return file.path.replace(pathMain, '');
        });
        console.log(pathLicense);
        const imagesNameObj = {
            image_card: pathDriver[0],
            image_vehicle: pathLicense[0]
        };
        const VisitorSaveInMiddleware = this.vsActionSaveIn.CheckSaveIn(body);
        let VisitorInfoMiddleware = null;
        if (await this.loadSettingLocalUtils.getBookingInMode(body.company_id) === 'qr_and_identitycard')
            VisitorInfoMiddleware = this.vsActionInforMiddleware.CheclVisitorinfo(body);
        const BookingMiddleware = await this.bActionInMiddleware.CheckSaveIn(body);
        if (VisitorSaveInMiddleware) {
            throw new callback_status_1.StatusException({
                error: VisitorSaveInMiddleware,
                result: null,
                message: VisitorSaveInMiddleware,
                statusCode: 200
            }, 200);
        }
        else if (VisitorInfoMiddleware) {
            throw new callback_status_1.StatusException({
                error: VisitorInfoMiddleware,
                result: null,
                message: VisitorInfoMiddleware,
                statusCode: 200
            }, 200);
        }
        else if (BookingMiddleware) {
            throw new callback_status_1.StatusException({
                error: BookingMiddleware,
                result: null,
                message: BookingMiddleware,
                statusCode: 200
            }, 200);
        }
        const checkTBVCode = await this.bActionInMiddleware.checkTbvCode(body);
        if (!checkTBVCode)
            throw new callback_status_1.StatusException({
                error: this.errMessageUtilsTh.errBookingNotFound,
                result: null,
                message: this.errMessageUtilsTh.errBookingNotFound,
                statusCode: 200
            }, 200);
        const getEmployeeID = await this.vsActionCheckEmployee.CheckInEmployee(body);
        if (!getEmployeeID)
            throw new callback_status_1.StatusException({
                error: this.errMessageUtilsTh.errEmployeeIDNotInDatabase,
                result: null,
                message: this.errMessageUtilsTh.errEmployeeIDNotInDatabase,
                statusCode: 200
            }, 200);
        const getHomeIDFromTBV = await this.bActionInMiddleware.getHomeIDFromTbvCode(body);
        console.log('getHomeIDFromTBV' + getHomeIDFromTBV);
        if (!getHomeIDFromTBV)
            throw new callback_status_1.StatusException({
                error: this.errMessageUtilsTh.errHomeIDNotInDataBase,
                result: null,
                message: this.errMessageUtilsTh.errHomeIDNotInDataBase,
                statusCode: 200
            }, 200);
        const getCartype = await this.vsActionCheckEmployee.checkCartypeCategory(body);
        if (!getCartype)
            throw new callback_status_1.StatusException({
                error: this.errMessageUtilsTh.errCartypeCategoryNotInbase,
                result: null,
                message: this.errMessageUtilsTh.errCartypeCategoryNotInbase,
                statusCode: 200
            }, 200);
        const getHomeID = await this.vsActionCheckHomeID.CheckHomeID(body, getHomeIDFromTBV);
        if (await getHomeID) {
            return await this.bActionINService.saveBookingIn(body, imagesNameObj, getHomeID, checkTBVCode, getEmployeeID, getCartype);
        }
        else
            throw new callback_status_1.StatusException({
                error: this.errMessageUtilsTh.errHomeIDNotInDataBase,
                result: null,
                message: this.errMessageUtilsTh.errHomeIDNotInDataBase,
                statusCode: 200
            }, 200);
    }
};
__decorate([
    common_1.Post('save'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.UseInterceptors(lpr_b_booking_save_in_interceptor_1.LPRBSaveInInterceptor, platform_express_1.FileFieldsInterceptor([
        { name: 'image_card', maxCount: 1 },
        { name: 'image_vehicle', maxCount: 1 }
    ], {
        storage: multer_1.diskStorage({
            destination: uploadfile_middleware_1.getCurrentDatePathFileSave,
            filename: uploadfile_middleware_1.editFileName,
        }),
        fileFilter: uploadfile_middleware_1.imageFileFilter,
        limits: { fileSize: 1024 * 1024 * config_setting_1.configfile.IMAGE_SIZE }
    }), default_interceptor_1.DefaultInterceptor),
    __param(0, common_1.UploadedFiles()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LptBSaveInController.prototype, "saveLPRBookingIn", null);
LptBSaveInController = __decorate([
    common_1.Controller('bannayuu/api/lpr/booking/save-in'),
    __metadata("design:paramtypes", [lpt_b_save_in_service_1.LptBSaveInService,
        err_message_th_utils_1.ErrMessageUtilsTH,
        vs_action_in_info_middleware_1.VsActionInInfoMiddleWare,
        vs_action_in_save_middleware_1.VsActionInSaveMiddleware,
        b_action_in_middleware_1.BActionInMiddleware,
        vs_action_in_checkhomeid_middleware_1.VsActionInCheckHomeIDMiddleWare,
        vs_action_in_check_employee_middleware_1.VsActionInCheckEmployeeMiddleWare,
        load_setting_local_utils_1.LoadSettingLocalUtils])
], LptBSaveInController);
exports.LptBSaveInController = LptBSaveInController;
//# sourceMappingURL=lpt-b-save-in.controller.js.map