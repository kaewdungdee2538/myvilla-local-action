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
exports.ActionOutSaveController = void 0;
const config_setting_1 = require("../../../../conf/config-setting");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const uploadfile_middleware_1 = require("../../../../middleware/image_manual/uploadfile.middleware");
const multer_1 = require("multer");
const action_out_service_1 = require("./action-out.service");
const callback_status_1 = require("../../../../utils/callback.status");
const err_message_th_utils_1 = require("../../../../utils/err_message_th.utils");
const vs_action_out_slotorcard_middleware_1 = require("../../../../middleware/visitor/action-out/save/vs_action_out_slotorcard.middleware");
const vs_action_out_forsave_middleware_1 = require("../../../../middleware/visitor/action-out/save/vs_action_out_forsave.middleware");
const action_out_interceptor_1 = require("../../../../interceptor/visitor/action-out/action-out.interceptor");
const vs_action_out_estamp_verify_middleware_1 = require("../../../../middleware/visitor/action-out/estamp-verify/vs_action_out_estamp_verify.middleware");
const default_interceptor_1 = require("../../../../interceptor/default/default.interceptor");
const jwt_auth_guard_1 = require("../../../../auth/jwt-auth.guard");
const action_out_values_interceptor_1 = require("../../../../interceptor/visitor/action-out/action-out-values.interceptor");
let ActionOutSaveController = class ActionOutSaveController {
    constructor(saveOutService, errMessageUtilsTh, vsactionOutSlotOrCardMid, vsactionOutForSaveMid, vsactionOutVerifyEstamMiddleware) {
        this.saveOutService = saveOutService;
        this.errMessageUtilsTh = errMessageUtilsTh;
        this.vsactionOutSlotOrCardMid = vsactionOutSlotOrCardMid;
        this.vsactionOutForSaveMid = vsactionOutForSaveMid;
        this.vsactionOutVerifyEstamMiddleware = vsactionOutVerifyEstamMiddleware;
    }
    async ActionSaveOut(files, body) {
        console.log('Files' + JSON.stringify(files));
        const pathMain = config_setting_1.configfile.PATHSAVEIMAGE;
        if (!files.image_vehicle) {
            throw new callback_status_1.StatusException({
                error: this.errMessageUtilsTh.errImageVehicleNotFound,
                result: null,
                message: this.errMessageUtilsTh.errImageVehicleNotFound,
                statusCode: 200,
                slip_info: null
            }, 200);
        }
        const pathDriver = files.image_vehicle.map(file => {
            return file.path.replace(pathMain, '');
        });
        const imagesNameObj = {
            image_vehicle: pathDriver[0]
        };
        const middlewareSaveOut = this.vsactionOutForSaveMid.CheckVisitorOut(body);
        if (middlewareSaveOut)
            throw new callback_status_1.StatusException({
                error: middlewareSaveOut,
                result: null,
                message: middlewareSaveOut,
                statusCode: 200,
                slip_info: null
            }, 200);
        const middlewareSlotOrCardSaveOut = await this.vsactionOutSlotOrCardMid.CheckVisitorOut(body);
        if (middlewareSlotOrCardSaveOut)
            throw new callback_status_1.StatusException({
                error: middlewareSlotOrCardSaveOut,
                result: null,
                message: middlewareSlotOrCardSaveOut,
                statusCode: 200,
                slip_info: null
            }, 200);
        const middlewareEstampVerify = await this.vsactionOutVerifyEstamMiddleware.checkValues(body);
        if (middlewareEstampVerify)
            throw new callback_status_1.StatusException({
                error: middlewareEstampVerify,
                result: null,
                message: middlewareEstampVerify,
                statusCode: 200,
                slip_info: null
            }, 200);
        return this.saveOutService.saveActionOut(imagesNameObj, body);
    }
};
__decorate([
    common_1.Post('save'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.UseInterceptors(action_out_interceptor_1.ActionOutInterceptor, platform_express_1.FileFieldsInterceptor([
        { name: 'image_vehicle', maxCount: 1 }
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
], ActionOutSaveController.prototype, "ActionSaveOut", null);
ActionOutSaveController = __decorate([
    common_1.Controller('bannayuu/api/visitor/action/out'),
    __metadata("design:paramtypes", [action_out_service_1.ActionOutSaveService,
        err_message_th_utils_1.ErrMessageUtilsTH,
        vs_action_out_slotorcard_middleware_1.VsActionOutSlotOrCardMiddleWare,
        vs_action_out_forsave_middleware_1.VsActionOutForSaveMiddleWare,
        vs_action_out_estamp_verify_middleware_1.vsActionOutVerifyEstampMiddleware])
], ActionOutSaveController);
exports.ActionOutSaveController = ActionOutSaveController;
//# sourceMappingURL=action-out.controller.js.map