import { JwtService } from '@nestjs/jwt';
import { vsDefaultMiddleware } from 'src/middleware/default/default.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
export declare class AuthService {
    private readonly errMessageUtilsTh;
    private readonly jwtService;
    private readonly dbconnecttion;
    private readonly defaultValueMiddleware;
    constructor(errMessageUtilsTh: ErrMessageUtilsTH, jwtService: JwtService, dbconnecttion: dbConnection, defaultValueMiddleware: vsDefaultMiddleware);
    validateUser(user: any): Promise<any>;
    login(user: any): Promise<void>;
}
