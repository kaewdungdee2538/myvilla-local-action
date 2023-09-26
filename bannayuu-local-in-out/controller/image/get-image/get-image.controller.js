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
exports.GetImageController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../auth/jwt-auth.guard");
const get_image_service_1 = require("./get-image.service");
let GetImageController = class GetImageController {
    constructor(getImageService) {
        this.getImageService = getImageService;
    }
    getImage(req, res) {
        return this.getImageService.getImageWithPathFile(req, res);
    }
};
__decorate([
    common_1.Post('get'),
    __param(0, common_1.Request()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], GetImageController.prototype, "getImage", null);
GetImageController = __decorate([
    common_1.Controller('bannayuu/api/manual/get-image'),
    __metadata("design:paramtypes", [get_image_service_1.GetImageService])
], GetImageController);
exports.GetImageController = GetImageController;
//# sourceMappingURL=get-image.controller.js.map