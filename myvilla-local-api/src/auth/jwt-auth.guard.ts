import { ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StatusException } from 'src/utils/callback.status';


// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {
// }
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            console.log(`Authentication Forbidden ${user}`);
            throw err || new StatusException({
                error: 'Forbidden',
                result: null,
                message: 'Forbidden',
                statusCode: 403
            }, 403)}
        return user;
    }
}
