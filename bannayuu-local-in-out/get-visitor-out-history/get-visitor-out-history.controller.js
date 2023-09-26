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
exports.GetVisitorOutHistoryController = void 0;
const common_1 = require("@nestjs/common");
const get_visitor_out_history_service_1 = require("./get-visitor-out-history.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let GetVisitorOutHistoryController = class GetVisitorOutHistoryController {
    constructor(getVisitorOutHistoryService) {
        this.getVisitorOutHistoryService = getVisitorOutHistoryService;
    }
    getSlipIn(body) {
        return this.getVisitorOutHistoryService.getVisitorOutHistory(body);
    }
};
__decorate([
    common_1.Post('history'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GetVisitorOutHistoryController.prototype, "getSlipIn", null);
GetVisitorOutHistoryController = __decorate([
    common_1.Controller('bannayuu/api/visitor/get-visitor-out'),
    __metadata("design:paramtypes", [get_visitor_out_history_service_1.GetVisitorOutHistoryService])
], GetVisitorOutHistoryController);
exports.GetVisitorOutHistoryController = GetVisitorOutHistoryController;
//# sourceMappingURL=get-visitor-out-history.controller.js.map