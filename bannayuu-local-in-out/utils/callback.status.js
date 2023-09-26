"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusException = void 0;
const common_1 = require("@nestjs/common");
class StatusException extends common_1.HttpException {
    constructor(response, status) {
        const data = { response };
        super(data, status);
    }
}
exports.StatusException = StatusException;
//# sourceMappingURL=callback.status.js.map