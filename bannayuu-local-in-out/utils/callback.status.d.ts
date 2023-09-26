import { HttpStatus } from "@nestjs/common";
import { HttpException } from "@nestjs/common";
export declare class StatusException extends HttpException {
    constructor(response: any, status: HttpStatus);
}
