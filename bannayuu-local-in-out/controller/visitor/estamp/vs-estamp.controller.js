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
exports.VsEstampController = void 0;
const config_setting_1 = require("../../../conf/config-setting");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const estamp_interceptor_1 = require("../../../interceptor/estamp/estamp.interceptor");
const vs_estamp_service_1 = require("./vs-estamp.service");
const multer_1 = require("multer");
const uploadfile_middleware_1 = require("../../../middleware/image_manual/uploadfile.middleware");
const EstampSaveVisitor_middleware_1 = require("../../../middleware/estamp/EstampSaveVisitor.middleware");
const default_interceptor_1 = require("../../../interceptor/default/default.interceptor");
let VsEstampController = class VsEstampController {
    constructor(vsEstampService) {
        this.vsEstampService = vsEstampService;
    }
    async getVisitorInfo(body) {
        return this.vsEstampService.getVisitorInfo(body);
    }
    async postStampVisitor(files, body) {
        const pathMain = config_setting_1.configfile.PATHSAVEIMAGE;
        const pathCustomer = files.image_customer.map(file => {
            return file.path.replace(pathMain, '');
        });
        const estampInfo = await this.vsEstampService.getEstampInfo(body);
        return this.vsEstampService.saveEstampVisitor(body, pathCustomer[0], estampInfo);
    }
};
__decorate([
    common_1.Post('get-visitorinfo'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VsEstampController.prototype, "getVisitorInfo", null);
__decorate([
    common_1.Post('stamp'),
    common_1.UseInterceptors(estamp_interceptor_1.EstampInterceptor, platform_express_1.FileFieldsInterceptor([
        { name: 'image_customer', maxCount: 1 }
    ], {
        storage: multer_1.diskStorage({
            destination: uploadfile_middleware_1.getCurrentDatePathFileSave,
            filename: uploadfile_middleware_1.editFileName,
        }),
        fileFilter: uploadfile_middleware_1.imageFileFilter,
        limits: { fileSize: 1024 * 1024 * 5 }
    }), EstampSaveVisitor_middleware_1.EstampSaveVisitorMiddleware, default_interceptor_1.DefaultInterceptor),
    __param(0, common_1.UploadedFiles()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VsEstampController.prototype, "postStampVisitor", null);
VsEstampController = __decorate([
    common_1.Controller('bannayuu/api/visitor/estamp'),
    __metadata("design:paramtypes", [vs_estamp_service_1.VsEstampService])
], VsEstampController);
exports.VsEstampController = VsEstampController;
//# sourceMappingURL=vs-estamp.controller.js.map