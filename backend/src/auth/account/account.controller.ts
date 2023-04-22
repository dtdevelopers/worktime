import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
} from '@nestjs/common';
import { ChangePassword } from '../../interfaces/change-password';
import { PasswordUtils } from '../../util/password-util';
import { AccountService } from './account.service';
import { Public } from '../guards/jwt.guard';
import { User } from '../../models/user.model';

@Controller('')
export class AccountController {
  public constructor(private readonly accountService: AccountService) {}

  @Public()
  @Post('/register')
  async register(@Body() user: User): Promise<void> {
    await this.accountService.register(user);
  }

  @Post('/change-password')
  public async changePassword(
    @Req() request,
    @Body() body: ChangePassword,
  ): Promise<void> {
    if (!PasswordUtils.checkPasswordLength(body.newPassword)) {
      throw new BadRequestException(
        'A senha precisa ter no mínimo 8 caracteres, ao menos 1 letra maiúscula, letras e numeros e no máximo 100 caracteres.',
      );
    }
    await this.accountService.changePassword(request.user.usuario.id, body);
  }

  // @Post('/forgot-password')
  // @Public()
  // public async forgotPassword(@Body('email') email: string): Promise<void> {
  //   if (!email) {
  //     throw new BadRequestException('E-mail inválido.');
  //   }
  //   await this.accountService.forgotPassword(email);
  // }
  //
  // @Post('/forgot-password/finish')
  // @Public()
  // public async forgotPasswordFinish(
  //   @Body() body: ResetPasswordFinishProps,
  // ): Promise<void> {
  //   if (!body.key && !body.newPassword) {
  //     throw new BadRequestException('Parametros inválidos');
  //   }
  //   if (!PasswordUtils.checkPasswordLength(body.newPassword)) {
  //     throw new BadRequestException(
  //       'A senha precisa ter no mínimo 8 caracteres, ao menos 1 letra maiúscula, letras e numeros e no máximo 100 caracteres.',
  //     );
  //   }
  //   await this.accountService.forgotPasswordFinish(body);
  // }
}
