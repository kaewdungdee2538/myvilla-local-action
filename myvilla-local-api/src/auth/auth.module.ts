import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { dbConnection } from 'src/pg_database/pg.database';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constant';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[ JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1d' },
  }),dbConnection],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,dbConnection],
  exports:[AuthService, JwtModule]
})
export class AuthModule {}
