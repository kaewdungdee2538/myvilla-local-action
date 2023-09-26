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
exports.LptBSaveOutController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../../../auth/jwt-auth.guard");
const b_action_out_middleware_1 = require("../../../middleware/booking/action-out/b_action_out.middleware");
const b_get_booking_out_info_middleware_1 = require("../../../middleware/booking/get-booking-out-info/b_get_booking_out_info.middleware");
const vs_action_in_check_employee_middleware_1 = require("../../../middleware/visitor/action-in/vs_action_in_check_employee.middleware");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
const lpt_b_save_out_service_1 = require("./lpt-b-save-out.service");
const multer_1 = require("multer");
const config_setting_1 = require("../../../conf/config-setting");
const uploadfile_middleware_1 = require("../../../middleware/image_manual/uploadfile.middleware");
const default_interceptor_1 = require("../../../interceptor/default/default.interceptor");
const callback_status_1 = require("../../../utils/callback.status");
const lpr_b_booking_save_out_interceptor_1 = require("../../../interceptor/lpr/\u0E34booking-out/lpr-b-booking-save-out.interceptor");
let LptBSaveOutController = class LptBSaveOutController {
    constructor(bActionOUTService, errMessageUtilsTh, bgetBookingOutInfoMiddleware, bActionOutMiddleware, vsActionInCheckEmployeeMiddleware) {
        this.bActionOUTService = bActionOUTService;
        this.errMessageUtilsTh = errMessageUtilsTh;
        this.bgetBookingOutInfoMiddleware = bgetBookingOutInfoMiddleware;
        this.bActionOutMiddleware = bActionOutMiddleware;
        this.vsActionInCheckEmployeeMiddleware = vsActionInCheckEmployeeMiddleware;
    }
    async saveBookingSaveOut(files, body) {
        console.log('Files' + JSON.stringify(files));
        const pathMain = config_setting_1.configfile.PATHSAVEIMAGE;
        if (!files.image_vehicle)
            throw new callback_status_1.StatusException({
                error: this.errMessageUtilsTh.errImageVehicleNotFound,
                result: null,
                message: this.errMessageUtilsTh.errImageVehicleNotFound,
                statusCode: 200
            }, 200);
        const pathVehicle = files.image_vehicle.map(file => {
            return file.path.replace(pathMain, '');
        });
        console.log(pathVehicle);
        const imagesNameObj = {
            image_vehicle: pathVehicle[0]
        };
        const tbvCodeMiddleware = await this.bActionOutMiddleware.CheckSaveIn(body);
        if (tbvCodeMiddleware)
            throw new callback_status_1.StatusException({
                error: tbvCodeMiddleware,
                result: null,
                message: tbvCodeMiddleware,
                statusCode: 200
            }, 200);
        const checkEstamp = await this.bgetBookingOutInfoMiddleware.checkBookingOutEstamp(body);
        if (checkEstamp)
            throw new callback_status_1.StatusException({
                error: checkEstamp,
                result: null,
                message: checkEstamp,
                statusCode: 200
            }, 200);
        else {
            const employeeObj = await this.vsActionInCheckEmployeeMiddleware.CheckOutEmployee(body);
            if (employeeObj) {
                return this.bActionOUTService.saveBActionOut(body, imagesNameObj, employeeObj);
            }
            else
                throw new callback_status_1.StatusException({
                    error: this.errMessageUtilsTh.errEmployeeInfoNotFound,
                    result: null,
                    message: this.errMessageUtilsTh.errEmployeeInfoNotFound,
                    statusCode: 200
                }, 200);
        }
    }
};
__decorate([
    common_1.Post('save'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.UseInterceptors(lpr_b_booking_save_out_interceptor_1.LPRBSaveOutInterceptor, platform_express_1.FileFieldsInterceptor([
        ,
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
], LptBSaveOutController.prototype, "saveBookingSaveOut", null);
LptBSaveOutController = __decorate([
    common_1.Controller('bannayuu/api/lpr/booking/save-out'),
    __metadata("design:paramtypes", [lpt_b_save_out_service_1.LptBSaveOutService,
        err_message_th_utils_1.ErrMessageUtilsTH,
        b_get_booking_out_info_middleware_1.bGetBookingOutInfoMiddleware,
        b_action_out_middleware_1.BActionOutMiddleware,
        vs_action_in_check_employee_middleware_1.VsActionInCheckEmployeeMiddleWare])
], LptBSaveOutController);
exports.LptBSaveOutController = LptBSaveOutController;
//# sourceMappingURL=lpt-b-save-out.controller.js.map