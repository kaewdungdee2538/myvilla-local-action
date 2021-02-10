import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constant';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { RegistryImageController } from './registry-image.controller';
import { RegistryImageService } from './registry-image.service';

@Module({
  imports:[JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1h' },
  })],
  controllers: [RegistryImageController],
  providers: [RegistryImageService,JwtStrategy,JwtModule],
  exports:[JwtModule]
})
export class RegistryImageModule {}
