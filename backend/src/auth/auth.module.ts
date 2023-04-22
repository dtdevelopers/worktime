import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { SharedModule } from 'src/shared/shared.module';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';
import { AuthController } from './auth.controller';
import { TokensService } from './tokens.service';
import { JWTGuard } from './guards/jwt.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AccountService } from './account/account.service';
import { AccountController } from './account/account.controller';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
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
    UserModule,
  ],
  controllers: [AuthController, AccountController],
  providers: [
    AccountService,
    AuthService,
    TokensService,
    JwtStrategy,
    UserService,
    UserRepository,
    {
      provide: APP_GUARD,
      useClass: JWTGuard,
    },
  ],
})
export class AuthModule {}
