import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { Observable } from 'rxjs';
import { StatusException } from 'src/utils/callback.status';
import { configfile } from 'src/conf/config-setting';

@Injectable()
export class BasicAuthenInterceptor implements NestInterceptor {
  constructor(
    private readonly errMessageUrilTh: ErrMessageUtilsTH,
    private readonly formatDataUtils: FormatDataUtils,
  ) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const authHeader = request.headers['authorization'];

    if (authHeader && authHeader.startsWith('Basic ')) {
      // Decode and validate the credentials
      const base64Credentials = authHeader.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString(
        'utf-8',
      );
      const [username, password] = credentials.split(':');
      // Perform your validation logic here
      if (
        username === configfile.BASIC_AUTH_USERNAME &&
        password === configfile.BASIC_AUTH_PASSWORD
      ) {
        request['user'] = { username }; // Customize this based on your user object structure
        return next.handle();
      } else {
        throw new StatusException(
          {
            error: this.errMessageUrilTh.errBasicAuthFailed,
            result: null,
            message: this.errMessageUrilTh.errBasicAuthFailed,
            statusCode: 401,
          },
          401,
        );
      }
    } else {
      throw new StatusException(
        {
          error: this.errMessageUrilTh.errBasicAuthFailed,
          result: null,
          message: this.errMessageUrilTh.errBasicAuthFailed,
          statusCode: 401,
        },
        401,
      );
    }
  }
}
