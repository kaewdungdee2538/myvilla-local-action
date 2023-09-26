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
exports.GetCartypeCategoryController = void 0;
const common_1 = require("@nestjs/common");
const get_cartype_category_service_1 = require("./get-cartype-category.service");
let GetCartypeCategoryController = class GetCartypeCategoryController {
    constructor(getCartypeCategoryService) {
        this.getCartypeCategoryService = getCartypeCategoryService;
    }
    getCartypeCategory(body) {
        return this.getCartypeCategoryService.getCartypeCategory(body);
    }
};
__decorate([
    common_1.Post('getcategory'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GetCartypeCategoryController.prototype, "getCartypeCategory", null);
GetCartypeCategoryController = __decorate([
    common_1.Controller('bannayuu/api/visitor/get-cartype-category'),
    __metadata("design:paramtypes", [get_cartype_category_service_1.GetCartypeCategoryService])
], GetCartypeCategoryController);
exports.GetCartypeCategoryController = GetCartypeCategoryController;
//# sourceMappingURL=get-cartype-category.controller.js.map