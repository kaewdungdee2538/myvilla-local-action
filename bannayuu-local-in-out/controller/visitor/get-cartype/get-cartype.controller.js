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
exports.GetCartypeController = void 0;
const common_1 = require("@nestjs/common");
const get_cartype_service_1 = require("./get-cartype.service");
let GetCartypeController = class GetCartypeController {
    constructor(getCartypeService) {
        this.getCartypeService = getCartypeService;
    }
    getCartype(body) {
        return this.getCartypeService.getCartype(body);
    }
};
__decorate([
    common_1.Post('cartypeinfo'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GetCartypeController.prototype, "getCartype", null);
GetCartypeController = __decorate([
    common_1.Controller('bannayuu/api/visitor/get-cartype'),
    __metadata("design:paramtypes", [get_cartype_service_1.GetCartypeService])
], GetCartypeController);
exports.GetCartypeController = GetCartypeController;
//# sourceMappingURL=get-cartype.controller.js.map