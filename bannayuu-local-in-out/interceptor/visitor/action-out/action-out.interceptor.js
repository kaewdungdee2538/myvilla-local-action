"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionOutInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let ActionOutInterceptor = class ActionOutInterceptor {
    intercept(context, next) {
        let request = context.switchToHttp().getRequest();
        request.cookie = {
            action_type: 'OUT',
            action_type_contrac: 'O',
            type: 'VISITOR',
            type_contrac: 'V'
        };
        return next.handle().pipe(operators_1.map(flow => {
            return flow;
        }));
    }
};
ActionOutInterceptor = __decorate([
    common_1.Injectable()
], ActionOutInterceptor);
exports.ActionOutInterceptor = ActionOutInterceptor;
//# sourceMappingURL=action-out.interceptor.js.map