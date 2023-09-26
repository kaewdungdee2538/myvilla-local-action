"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiveParcelInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let ReceiveParcelInterceptor = class ReceiveParcelInterceptor {
    intercept(context, next) {
        let request = context.switchToHttp().getRequest();
        request.cookie = {
            action_type: 'RECEIVE',
            action_type_contrac: 'APLC',
            type: 'PARCEL',
            type_contrac: 'APLC'
        };
        return next.handle().pipe(operators_1.map(flow => {
            return flow;
        }));
    }
};
ReceiveParcelInterceptor = __decorate([
    common_1.Injectable()
], ReceiveParcelInterceptor);
exports.ReceiveParcelInterceptor = ReceiveParcelInterceptor;
//# sourceMappingURL=recieve-pacel.interceptor.js.map