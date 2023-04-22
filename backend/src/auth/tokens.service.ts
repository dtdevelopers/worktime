import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignOptions, TokenExpiredError } from 'jsonwebtoken';
import { User } from '../models/user.model';
import { addSeconds } from 'date-fns';
import { UserService } from '../user/user.service';
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces';

export interface RefreshTokenPayload {
  jti: number;
  sub: number;
}

export interface AuthenticationPayload {
  token: string;
  refresh_token?: string;
  user: User;
}

@Injectable()
export class TokensService {
  public constructor(
    private readonly jwt: JwtService,
    private readonly userService: UserService,
  ) {}

  public buildResponsePayload(
    user: User,
    accessToken: string,
    refreshToken?: string,
  ): AuthenticationPayload {
    return {
      user,
      token: accessToken,
      ...(refreshToken ? { refresh_token: refreshToken } : {}),
    };
  }

  public async generateAccessToken(user: User): Promise<string> {
    const opts: JwtSignOptions = {
      subject: String(user.id),
      secret: process.env.APP_SECRET,
    };
    return this.jwt.signAsync({}, opts);
  }

  public async generateRefreshToken(
    user: User,
    expiresIn: number,
  ): Promise<string> {
    // const newToken: RefreshToken = new RefreshToken();
    const newToken: any = {};
    newToken.userId = user.id;
    newToken.isRevoked = false;
    newToken.expires = addSeconds(new Date(), expiresIn);

    const opts: SignOptions = {
      expiresIn,
      subject: String(user.id),
      jwtid: String(newToken.id),
    };
    return this.jwt.signAsync({}, opts);
  }

  public async resolveRefreshToken(encoded: string): Promise<User> {
    try {
      const payload = await this.decodeRefreshToken(encoded);
      const user = await this.getUserFromRefreshTokenPayload(payload);
      if (!user) {
        throw new UnprocessableEntityException('Refresh token malformed');
      }
      return user;
    } catch (e: any) {
      if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException('Refresh token revoked');
      }
      throw e;
    }
  }

  public async createAccessTokenFromRefreshToken(
    refresh: string,
  ): Promise<{ token: string; user: User; refreshToken: string }> {
    const user = await this.resolveRefreshToken(refresh);
    const token = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user, 86400);

    return { user, token, refreshToken };
  }

  private async decodeRefreshToken(
    token: string,
  ): Promise<RefreshTokenPayload> {
    try {
      return this.jwt.verifyAsync(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnprocessableEntityException('Refresh token expired');
      } else {
        throw new UnprocessableEntityException('Refresh token malformed');
      }
    }
  }

  private async getUserFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<User> {
    const subId = payload.sub;
    if (!subId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return this.userService.findOne(subId);
  }

  public async generateMeResponse(
    userId: number,
  ): Promise<AuthenticationPayload> {
    const user: User | null = await this.userService.findOne(userId);
    if (!user) {
      throw new BadRequestException('Usuário não encontrado.');
    }
    user.password = undefined;
    const token = await this.generateAccessToken(user);
    return {
      user,
      token,
    };
  }
}
