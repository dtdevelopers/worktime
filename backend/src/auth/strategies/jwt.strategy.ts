import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../models/user.model';
import { UserService } from '../../user/user.service';
import { ApiConfigService } from '../../shared/services/api-config.service';

export interface AccessTokenPayload {
  sub: number;
  permissions: string[];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private userService: UserService;

  public constructor(
    userService: UserService,
    apiConfigService: ApiConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: apiConfigService.appSecret,
      signOptions: {
        expiresIn: apiConfigService.isDevelopment ? '120d' : '1h',
      },
    });
    this.userService = userService;
  }

  async validate(payload: AccessTokenPayload): Promise<User> {
    const { sub: id } = payload;
    const user = await this.userService.findOne(id);
    if (!user) {
      return null;
    }
    return user;
  }
}
