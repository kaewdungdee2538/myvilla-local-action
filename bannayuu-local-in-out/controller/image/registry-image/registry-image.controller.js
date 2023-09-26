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
exports.RegistryImageController = void 0;
const common_1 = require("@nestjs/common");
const jwt_registry_image_guard_1 = require("./jwt-registry-image.guard");
const registry_image_service_1 = require("./registry-image.service");
let RegistryImageController = class RegistryImageController {
    constructor(registryImageService) {
        this.registryImageService = registryImageService;
    }
    registryImage(body) {
        return this.registryImageService.validateImage(body);
    }
    accessImage(req) {
        console.log(req.user.image_path);
        return req.user.image_path;
    }
};
__decorate([
    common_1.Post('registry'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RegistryImageController.prototype, "registryImage", null);
__decorate([
    common_1.UseGuards(jwt_registry_image_guard_1.JwtRegistryImage),
    common_1.Post('access'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RegistryImageController.prototype, "accessImage", null);
RegistryImageController = __decorate([
    common_1.Controller('bannayuu/api/registry-image'),
    __metadata("design:paramtypes", [registry_image_service_1.RegistryImageService])
], RegistryImageController);
exports.RegistryImageController = RegistryImageController;
//# sourceMappingURL=registry-image.controller.js.map