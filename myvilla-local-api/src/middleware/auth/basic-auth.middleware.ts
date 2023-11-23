import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { StatusException } from 'src/utils/callback.status';
import { configfile } from 'src/conf/config-setting';

@Injectable()
export class BasicAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly errMessageUrilTh: ErrMessageUtilsTH,
    private readonly formatDataUtils: FormatDataUtils,
    private readonly dbconnection: dbConnection,
  ) {}
  async use(req: Request, res: Response, next: () => void) {
    const authHeader = req.headers['authorization'];

    if (authHeader && authHeader.startsWith('Basic ')) {
      // Decode and validate the credentials
      const base64Credentials = authHeader.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString(
        'utf-8',
      );
      const [username, password] = credentials.split(':');
      // Perform your validation logic here
      if (username === configfile.BASIC_AUTH_USERNAME &&password === configfile.BASIC_AUTH_PASSWORD) {
        req['user'] = { username }; // Customize this based on your user object structure
        next();
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
