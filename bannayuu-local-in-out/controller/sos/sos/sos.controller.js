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
exports.SosController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../auth/jwt-auth.guard");
const sos_service_1 = require("./sos.service");
let SosController = class SosController {
    constructor(sosService) {
        this.sosService = sosService;
    }
    getCartype(body) {
        return this.sosService.getSosAllByCompany(body);
    }
    getSosHistoryByCompany(body) {
        return this.sosService.getSosHistoryByCompany(body);
    }
    async getSosInfoById(body) {
        return this.sosService.getSosInfoById(body);
    }
    async saveCorporateReceive(body) {
        return this.sosService.saveCorporateReceive(body);
    }
};
__decorate([
    common_1.Post('get-not-approve'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SosController.prototype, "getCartype", null);
__decorate([
    common_1.Post('get-history'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SosController.prototype, "getSosHistoryByCompany", null);
__decorate([
    common_1.Post('get-by-id'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SosController.prototype, "getSosInfoById", null);
__decorate([
    common_1.Post('corporate-receive'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SosController.prototype, "saveCorporateReceive", null);
SosController = __decorate([
    common_1.Controller('bannayuu/api/sos'),
    __metadata("design:paramtypes", [sos_service_1.SosService])
], SosController);
exports.SosController = SosController;
//# sourceMappingURL=sos.controller.js.map