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
exports.ParcelController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const parcel_service_1 = require("./parcel.service");
const multer_1 = require("multer");
const uploadfile_middleware_1 = require("../../middleware/image_manual/uploadfile.middleware");
const recieve_pacel_interceptor_1 = require("../../interceptor/pacel/recieve-pacel.interceptor");
const default_interceptor_1 = require("../../interceptor/default/default.interceptor");
const parcel_receive_interceptor_1 = require("../../interceptor/pacel/parcel-receive.interceptor");
const config_setting_1 = require("../../conf/config-setting");
const home_address_interceptor_1 = require("../../interceptor/home/home-address.interceptor");
let ParcelController = class ParcelController {
    constructor(parcelService) {
        this.parcelService = parcelService;
    }
    async addParcelReceive(files, body, req) {
        const pathMain = config_setting_1.configfile.PATHPACELSAVEIMAGE;
        const pathCustomer = !files.image_parcel_receive ? [] : files.image_parcel_receive.map(file => {
            const newfilename = file.path.replace(pathMain, '');
            return newfilename.replace(/\\/g, '/');
        });
        console.log(body);
        return await this.parcelService.addParcelReceive(body, req, pathCustomer);
    }
};
__decorate([
    common_1.Post('receive-parcel'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.UseInterceptors(recieve_pacel_interceptor_1.ReceiveParcelInterceptor, platform_express_1.FileFieldsInterceptor([
        { name: 'image_parcel_receive', maxCount: 1 }
    ], {
        storage: multer_1.diskStorage({
            destination: uploadfile_middleware_1.getCurrentDatePathFileForPacelSave,
            filename: uploadfile_middleware_1.editFileName,
        }),
        fileFilter: uploadfile_middleware_1.imageFileFilter,
        limits: { fileSize: 1024 * 1024 * 5 }
    }), default_interceptor_1.DefaultInterceptor, parcel_receive_interceptor_1.ParcelReceiveInterceptor, home_address_interceptor_1.HomeAddressInterceptor),
    __param(0, common_1.UploadedFiles()), __param(1, common_1.Body()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ParcelController.prototype, "addParcelReceive", null);
ParcelController = __decorate([
    common_1.Controller('bannayuu/api/parcel'),
    __metadata("design:paramtypes", [parcel_service_1.ParcelService])
], ParcelController);
exports.ParcelController = ParcelController;
//# sourceMappingURL=parcel.controller.js.map