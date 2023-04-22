import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../models/user.model';
import { Public, RefreshToken } from './guards/jwt.guard';
import { AuthenticationPayload, TokensService } from './tokens.service';

export type LoginRequestType = {
  username: string;
  password: string;
};

@Controller('')
export class AuthController {
  public constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokensService,
  ) {}

  @Post('/authenticate')
  @Public()
  public async login(
    @Body() body: LoginRequestType,
  ): Promise<AuthenticationPayload> {
    try {
      const { username, password } = body;
      const user: User = await this.userService.findByUsernameOrEmail(username);
      const valid = user
        ? await this.userService.validateCredentials(user, password)
        : false;
      if (!valid) {
        throw new UnauthorizedException('Usuário ou senha inválido.');
      }
      user.password = undefined;
      const token = await this.tokenService.generateAccessToken(user);
      const refreshToken = await this.tokenService.generateRefreshToken(
        user,
        86400,
      );
      const payload = this.tokenService.buildResponsePayload(
        user,
        token,
        refreshToken,
      );
      await this.userService.updateLastLogin(user.id);
      return payload;
    } catch (e: any) {
      throw e;
    }
  }

  @Post('/refresh')
  @RefreshToken()
  public async refresh(
    @Body('refresh_token') refreshToken,
  ): Promise<AuthenticationPayload> {
    const {
      user,
      token,
      refreshToken: refreshNew,
    } = await this.tokenService.createAccessTokenFromRefreshToken(refreshToken);
    user.password = undefined;
    return this.tokenService.buildResponsePayload(user, token, refreshNew);
  }

  @Get('/account')
  public async getUser(@Req() request): Promise<any> {
    try {
      const userId = request.user.id;
      return await this.tokenService.generateMeResponse(userId);
    } catch (e: any) {
      throw e;
    }
  }
}
