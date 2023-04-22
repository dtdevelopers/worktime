import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { User } from 'src/models/user.model';
import { UserController } from './user.controller';
import { AuthService } from '../auth/auth.service';
import { APP_GUARD } from '@nestjs/core';
import { JWTGuard } from '../auth/guards/jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from '../shared/shared.module';
import { ApiConfigService } from '../shared/services/api-config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) => ({
        secret: configService.appSecret,
        signOptions: {
          expiresIn: configService.isDevelopment ? '120d' : '1h',
        },
      }),
      inject: [ApiConfigService],
    }),
  ],
  providers: [
    UserService,
    UserRepository,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JWTGuard,
    },
  ],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
