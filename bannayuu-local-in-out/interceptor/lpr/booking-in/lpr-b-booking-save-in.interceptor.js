"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LPRBSaveInInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let LPRBSaveInInterceptor = class LPRBSaveInInterceptor {
    intercept(context, next) {
        let request = context.switchToHttp().getRequest();
        request.cookie = {
            action_type: 'IN',
            action_type_contrac: 'I',
            type: 'LPRBOOKING',
            type_contrac: 'LPRB'
        };
        return next.handle().pipe(operators_1.map(flow => {
            return flow;
        }));
    }
};
LPRBSaveInInterceptor = __decorate([
    common_1.Injectable()
], LPRBSaveInInterceptor);
exports.LPRBSaveInInterceptor = LPRBSaveInInterceptor;
//# sourceMappingURL=lpr-b-booking-save-in.interceptor.js.map