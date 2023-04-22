import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { SetMetadata } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const IS_PUBLIC_KEY = 'isPublic';
export const IS_REFRESH_TOKEN_KEY = 'isRefreshToken';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const RefreshToken = () => SetMetadata(IS_REFRESH_TOKEN_KEY, true);
export const PublicPassword = () => SetMetadata(IS_REFRESH_TOKEN_KEY, true);

@Injectable()
export class JWTGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector, private jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const isRefreshToken = this.reflector.getAllAndOverride<boolean>(
      IS_REFRESH_TOKEN_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (isPublic || isRefreshToken) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (!user) {
      throw new UnauthorizedException();
    }
    if (err || info) {
      throw new BadRequestException();
    }
    return user;
  }
}
