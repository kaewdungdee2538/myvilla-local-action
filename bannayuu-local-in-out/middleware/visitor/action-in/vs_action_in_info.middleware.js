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
exports.VsActionInInfoMiddleWare = void 0;
const common_1 = require("@nestjs/common");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../utils/format_data.utils");
let VsActionInInfoMiddleWare = class VsActionInInfoMiddleWare {
    constructor(formatUtils, errMessageUtilsTh) {
        this.formatUtils = formatUtils;
        this.errMessageUtilsTh = errMessageUtilsTh;
    }
    CheclVisitorinfo(body) {
        return this.checkVisitorValues(body);
    }
    checkVisitorValues(body) {
        console.log('checkVisitorValues');
        if (!body.visitor_info) {
            return this.errMessageUtilsTh.errVisitorInfoNotFound;
        }
        else {
            const visitorInfo = JSON.parse(body.visitor_info);
            return null;
        }
    }
};
VsActionInInfoMiddleWare = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [format_data_utils_1.FormatDataUtils,
        err_message_th_utils_1.ErrMessageUtilsTH])
], VsActionInInfoMiddleWare);
exports.VsActionInInfoMiddleWare = VsActionInInfoMiddleWare;
//# sourceMappingURL=vs_action_in_info.middleware.js.map