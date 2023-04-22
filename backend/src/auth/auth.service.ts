import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from '../models/user.model';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { TokenExpiredError } from 'jsonwebtoken';

export interface RefreshTokenPayload {
  jti: number;
  sub: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async validateIdentity(token): Promise<{ user: User; token: string }> {
    try {
      const decoded: any = await this.jwt.decode(token);
      if (decoded && decoded.exp * 1000 - new Date().getTime() > 0) {
        const user = await this.userService.findOne(decoded.sub);
        return { user, token };
      }
      return null;
    } catch (error) {
      throw new UnauthorizedException('Token invalid!');
    }
  }

  async getUserFromToken(token: string): Promise<User> {
    try {
      const { sub } = await this.jwt.verifyAsync(token.replace('Bearer ', ''));
      return this.userService.findOne(sub);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnprocessableEntityException('Refresh token expired');
      } else {
        throw new UnprocessableEntityException('Refresh token malformed');
      }
    }
  }
}
