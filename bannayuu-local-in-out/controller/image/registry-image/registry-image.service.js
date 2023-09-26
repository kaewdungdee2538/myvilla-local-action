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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistryImageService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let RegistryImageService = class RegistryImageService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async validateImage(image_path) {
        console.log(image_path);
        if (image_path)
            return await this.registyImage(image_path);
        else
            return null;
    }
    async registyImage(image_path) {
        const payload = image_path;
        const access_token = {
            access_token: this.jwtService.sign(payload)
        };
        return access_token;
    }
};
RegistryImageService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], RegistryImageService);
exports.RegistryImageService = RegistryImageService;
//# sourceMappingURL=registry-image.service.js.map