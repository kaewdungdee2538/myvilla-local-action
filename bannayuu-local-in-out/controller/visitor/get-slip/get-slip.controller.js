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
exports.GetSlipController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../auth/jwt-auth.guard");
const get_slip_service_1 = require("./get-slip.service");
let GetSlipController = class GetSlipController {
    constructor(getslipService) {
        this.getslipService = getslipService;
    }
    getSlipIn(body) {
        return this.getslipService.getSlipInInfo(body);
    }
    getSlipOut(body) {
        return this.getslipService.getSlipOutInfo(body);
    }
};
__decorate([
    common_1.Post('slipin'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GetSlipController.prototype, "getSlipIn", null);
__decorate([
    common_1.Post('slipout'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GetSlipController.prototype, "getSlipOut", null);
GetSlipController = __decorate([
    common_1.Controller('bannayuu/api/visitor/get-slip'),
    __metadata("design:paramtypes", [get_slip_service_1.GetSlipService])
], GetSlipController);
exports.GetSlipController = GetSlipController;
//# sourceMappingURL=get-slip.controller.js.map