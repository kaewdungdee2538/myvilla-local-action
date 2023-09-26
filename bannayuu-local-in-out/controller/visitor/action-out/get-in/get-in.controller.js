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
exports.GetInController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../../auth/jwt-auth.guard");
const registry_image_service_1 = require("../../../image/registry-image/registry-image.service");
const get_in_service_1 = require("./get-in.service");
let GetInController = class GetInController {
    constructor(getInService) {
        this.getInService = getInService;
    }
    getActionInInfo(body, req) {
        return this.getInService.getActionInInfo(body, req);
    }
};
__decorate([
    common_1.Post('getaction-info'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], GetInController.prototype, "getActionInInfo", null);
GetInController = __decorate([
    common_1.Controller('bannayuu/api/visitor/action/out/get-in'),
    __metadata("design:paramtypes", [get_in_service_1.GetInService])
], GetInController);
exports.GetInController = GetInController;
//# sourceMappingURL=get-in.controller.js.map