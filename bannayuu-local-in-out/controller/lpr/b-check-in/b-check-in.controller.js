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
exports.LPRBCheckInController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../auth/jwt-auth.guard");
const b_check_in_service_1 = require("./b-check-in.service");
let LPRBCheckInController = class LPRBCheckInController {
    constructor(bCheckInService) {
        this.bCheckInService = bCheckInService;
    }
    getBookingWithLPR(body) {
        return this.bCheckInService.getBookingWithLPR(body);
    }
};
__decorate([
    common_1.Post('get'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LPRBCheckInController.prototype, "getBookingWithLPR", null);
LPRBCheckInController = __decorate([
    common_1.Controller('bannayuu/api/lpr/booking/check-in'),
    __metadata("design:paramtypes", [b_check_in_service_1.LPRBCheckInService])
], LPRBCheckInController);
exports.LPRBCheckInController = LPRBCheckInController;
//# sourceMappingURL=b-check-in.controller.js.map