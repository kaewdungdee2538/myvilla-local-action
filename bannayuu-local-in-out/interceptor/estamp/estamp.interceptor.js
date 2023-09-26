"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstampInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let EstampInterceptor = class EstampInterceptor {
    intercept(context, next) {
        let request = context.switchToHttp().getRequest();
        request.cookie = {
            action_type: 'ESTAMP',
            action_type_contrac: 'ESM',
            type: 'ESTAMP',
            type_contrac: 'ESM'
        };
        return next.handle().pipe(operators_1.map(flow => {
            return flow;
        }));
    }
};
EstampInterceptor = __decorate([
    common_1.Injectable()
], EstampInterceptor);
exports.EstampInterceptor = EstampInterceptor;
//# sourceMappingURL=estamp.interceptor.js.map