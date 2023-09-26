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
exports.ActionInController = void 0;
const config_setting_1 = require("../../../conf/config-setting");
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../../../auth/jwt-auth.guard");
const action_in_service_1 = require("./action-in.service");
const multer_1 = require("multer");
const moment = require("moment");
const uploadfile_middleware_1 = require("../../../middleware/image_manual/uploadfile.middleware");
const vs_action_in_save_middleware_1 = require("../../../middleware/visitor/action-in/vs_action_in_save.middleware");
const vs_action_in_info_middleware_1 = require("../../../middleware/visitor/action-in/vs_action_in_info.middleware");
const vs_action_in_checkslot_middleware_1 = require("../../../middleware/visitor/action-in/vs_action_in_checkslot.middleware");
const callback_status_1 = require("../../../utils/callback.status");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
const vs_action_in_checkhomeid_middleware_1 = require("../../../middleware/visitor/action-in/vs_action_in_checkhomeid.middleware");
const vs_action_in_check_employee_middleware_1 = require("../../../middleware/visitor/action-in/vs_action_in_check_employee.middleware");
const action_in_interceptor_1 = require("../../../interceptor/visitor/action-in/action-in.interceptor");
const load_setting_local_utils_1 = require("../../../utils/load_setting_local.utils");
const default_interceptor_1 = require("../../../interceptor/default/default.interceptor");
let ActionInController = class ActionInController {
    constructor(actionINService, errMessageUtilsTh, vsActionCheckMiddleware, vsActionInforMiddleware, vsActionSaveIn, vsActionCheckHomeID, vsActionCheckEmployee, loadSettingLocalUtils) {
        this.actionINService = actionINService;
        this.errMessageUtilsTh = errMessageUtilsTh;
        this.vsActionCheckMiddleware = vsActionCheckMiddleware;
        this.vsActionInforMiddleware = vsActionInforMiddleware;
        this.vsActionSaveIn = vsActionSaveIn;
        this.vsActionCheckHomeID = vsActionCheckHomeID;
        this.vsActionCheckEmployee = vsActionCheckEmployee;
        this.loadSettingLocalUtils = loadSettingLocalUtils;
    }
    async ActionSaveIn(files, body) {
        console.log('Files' + JSON.stringify(files));
        console.log('Body' + JSON.stringify(body));
        const pathMain = config_setting_1.configfile.PATHSAVEIMAGE;
        if (!files.image_card) {
            throw new callback_status_1.StatusException({
                error: this.errMessageUtilsTh.errImageCardNotFound,
                result: null,
                message: this.errMessageUtilsTh.errImageCardNotFound,
                statusCode: 200,
            }, 200);
        }
        else if (!files.image_vehicle) {
            throw new callback_status_1.StatusException({
                error: this.errMessageUtilsTh.errImageVehicleNotFound,
                result: null,
                message: this.errMessageUtilsTh.errImageVehicleNotFound,
                statusCode: 200,
            }, 200);
        }
        const pathDriver = files.image_card.map((file) => {
            return file.path.replace(pathMain, '');
        });
        console.log(pathDriver);
        const pathLicense = files.image_vehicle.map((file) => {
            return file.path.replace(pathMain, '');
        });
        console.log(pathLicense);
        const imagesNameObj = {
            image_card: pathDriver[0],
            image_vehicle: pathLicense[0],
        };
        let VisitorInfo = null;
        const setupCompany = await this.loadSettingLocalUtils.getVisitorInMode(body.company_id);
        if ((setupCompany === null || setupCompany === void 0 ? void 0 : setupCompany.visitor_verify) === 'identitycard')
            VisitorInfo = this.vsActionInforMiddleware.CheclVisitorinfo(body);
        const VisitorSaveIn = this.vsActionSaveIn.CheckSaveIn(body);
        const VisitorValues = await this.vsActionCheckMiddleware.CheckActionIN(body);
        if (VisitorInfo) {
            throw new callback_status_1.StatusException({
                error: VisitorInfo,
                result: null,
                message: VisitorInfo,
                statusCode: 200,
            }, 200);
        }
        else if (VisitorSaveIn) {
            throw new callback_status_1.StatusException({
                error: VisitorSaveIn,
                result: null,
                message: VisitorSaveIn,
                statusCode: 200,
            }, 200);
        }
        else if (VisitorValues) {
            throw new callback_status_1.StatusException({
                error: VisitorValues,
                result: null,
                message: VisitorValues,
                statusCode: 200,
            }, 200);
        }
        else {
            const getEmployeeID = await this.vsActionCheckEmployee.CheckInEmployee(body);
            if (!getEmployeeID)
                throw new callback_status_1.StatusException({
                    error: this.errMessageUtilsTh.errEmployeeIDNotInDatabase,
                    result: null,
                    message: this.errMessageUtilsTh.errEmployeeIDNotInDatabase,
                    statusCode: 200,
                }, 200);
            const getCartype = await this.vsActionCheckEmployee.checkCartypeCategory(body);
            if (!getCartype)
                throw new callback_status_1.StatusException({
                    error: this.errMessageUtilsTh.errCartypeCategoryNotInbase,
                    result: null,
                    message: this.errMessageUtilsTh.errCartypeCategoryNotInbase,
                    statusCode: 200,
                }, 200);
            const getHomeID = await this.vsActionCheckHomeID.CheckHomeID(body, body.home_id);
            if (await getHomeID) {
                return await this.getSlotOrGetCard(imagesNameObj, body, getHomeID, getEmployeeID, getCartype, setupCompany === null || setupCompany === void 0 ? void 0 : setupCompany.line_notification_mode);
            }
            else
                throw new callback_status_1.StatusException({
                    error: this.errMessageUtilsTh.errHomeIDNotInDataBase,
                    result: null,
                    message: this.errMessageUtilsTh.errHomeIDNotInDataBase,
                    statusCode: 200,
                }, 200);
        }
    }
    async getSlotOrGetCard(files, body, getHomeID, getEmployeeID, getCartype, lineNotificationMode) {
        console.log('Get slot Or Get Card');
        const visitorInfo = JSON.parse(body.visitor_info);
        const notiReq = {
            m_home_id: body && body.home_id,
            m_company_id: body && body.company_id,
            m_contact_name: visitorInfo && `${visitorInfo.first_name_th} ${visitorInfo.last_name_th}`,
            m_contact_licenseplate: body && body.license_plate,
            m_contact_time_in: moment().format("YYYY-MM-DD HH:mm:ss"),
            m_path_img: files && files.image_vehicle ? files.image_vehicle : null
        };
        console.log('notiReq' + JSON.stringify(notiReq));
        if (body.visitor_slot_number) {
            console.log('Get slot');
            const getVisitorSlotID = await this.actionINService.getVisitorSlotID(body);
            if (getVisitorSlotID) {
                console.log(notiReq);
                const notiRes = await this.actionINService.SendLineNotificationActionIn(notiReq, lineNotificationMode);
                console.log('line notifycation response : ' + JSON.stringify(notiRes));
                return this.actionINService.ActionSaveIn(files, body, getVisitorSlotID[0].visitor_slot_id, null, getHomeID, getEmployeeID, getCartype);
            }
            throw new callback_status_1.StatusException({
                error: getVisitorSlotID.error,
                result: null,
                message: this.errMessageUtilsTh.errGetSlotVisitorNumberIsFail,
                statusCode: 200,
            }, 200);
        }
        const getCardID = await this.actionINService.getCardID(body);
        console.log('Get Card' + JSON.stringify(getCardID));
        if (getCardID) {
            console.log(notiReq);
            const notiRes = await this.actionINService.SendLineNotificationActionIn(notiReq, lineNotificationMode);
            console.log('line notifycation response : ' + JSON.stringify(notiRes));
            return this.actionINService.ActionSaveIn(files, body, null, getCardID, getHomeID, getEmployeeID, getCartype);
        }
        throw new callback_status_1.StatusException({
            error: this.errMessageUtilsTh.errGetCardIDIsFail,
            result: null,
            message: this.errMessageUtilsTh.errGetCardIDIsFail,
            statusCode: 200,
        }, 200);
    }
};
__decorate([
    common_2.Post('save'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.UseInterceptors(action_in_interceptor_1.ActionInInterceptor, platform_express_1.FileFieldsInterceptor([
        { name: 'image_card', maxCount: 1 },
        { name: 'image_vehicle', maxCount: 1 },
    ], {
        storage: multer_1.diskStorage({
            destination: uploadfile_middleware_1.getCurrentDatePathFileSave,
            filename: uploadfile_middleware_1.editFileName,
        }),
        fileFilter: uploadfile_middleware_1.imageFileFilter,
        limits: { fileSize: 1024 * 1024 * config_setting_1.configfile.IMAGE_SIZE },
    }), default_interceptor_1.DefaultInterceptor),
    __param(0, common_1.UploadedFiles()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ActionInController.prototype, "ActionSaveIn", null);
__decorate([
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, String]),
    __metadata("design:returntype", Promise)
], ActionInController.prototype, "getSlotOrGetCard", null);
ActionInController = __decorate([
    common_2.Controller('bannayuu/api/visitor/action/in'),
    __metadata("design:paramtypes", [action_in_service_1.ActionInService,
        err_message_th_utils_1.ErrMessageUtilsTH,
        vs_action_in_checkslot_middleware_1.VsActionInCheckSlotMiddleWare,
        vs_action_in_info_middleware_1.VsActionInInfoMiddleWare,
        vs_action_in_save_middleware_1.VsActionInSaveMiddleware,
        vs_action_in_checkhomeid_middleware_1.VsActionInCheckHomeIDMiddleWare,
        vs_action_in_check_employee_middleware_1.VsActionInCheckEmployeeMiddleWare,
        load_setting_local_utils_1.LoadSettingLocalUtils])
], ActionInController);
exports.ActionInController = ActionInController;
//# sourceMappingURL=action-in.controller.js.map