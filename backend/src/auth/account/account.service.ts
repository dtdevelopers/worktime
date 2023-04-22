import { BadRequestException, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { User } from 'src/models/user.model';
import { UserService } from '../../user/user.service';
import { ChangePassword } from '../../interfaces/change-password';
import { MailService } from '../../mail/mail.service';
import { UserRepository } from '../../user/user.repository';

export type ResetPasswordFinishProps = {
  key: string;
  newPassword: string;
};

@Injectable()
export class AccountService {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly mailService: MailService,
    private readonly userService: UserService,
  ) {}

  public async register(user: User): Promise<void> {
    const { id } = await this.userRepository.saveNew({
      ...user,
      password: await this.encryptPassword(user.password),
    });
    await this.mailService.sendCreationAccount(
      await this.userRepository.findById(id),
    );
  }

  public async encryptPassword(password: any): Promise<string> {
    return await hash(password, 8);
  }

  public async changePassword(
    userId: number,
    { newPassword, currentPassword }: ChangePassword,
  ): Promise<void> {
    const user: User | null = await this.userService.findOne(userId);
    if (!user) {
      throw new BadRequestException('Usuário inválido.');
    }
    if (!(await compare(currentPassword, user.password))) {
      throw new BadRequestException(
        'A senha atual informada não está correta.',
      );
    }
    if (await compare(newPassword, user.password)) {
      throw new BadRequestException(
        'A sua nova senha não pode ser igual a senha atual.',
      );
    }

    await this.userRepository.save({
      ...user,
      password: await this.encryptPassword(newPassword),
    });
  }

  // public async forgotPasswordFinish({
  //   key,
  //   newPassword,
  // }: ResetPasswordFinishProps): Promise<void> {
  //   const user = await this.userRepository.findOne({
  //     where: {
  //       resetKey: key,
  //     },
  //   });
  //
  //   if (!user) {
  //     throw new BadRequestException(
  //       'Não foi possível recuperar senha. O e-mail informado não foi encontrado.',
  //     );
  //   }
  //   const nowMinus48h = subHours(new Date(), 48);
  //   if (!isAfter(user.resetDate, nowMinus48h)) {
  //     throw new BadRequestException('Chave de reset expirada.');
  //   }
  //
  //   if (await compare(newPassword, user.password)) {
  //     throw new BadRequestException(
  //       'A sua nova senha não pode ser igual a senha atual.',
  //     );
  //   }
  //
  //   user.password = await this.encryptPassword(newPassword);
  //   user.resetKey = null;
  //   user.resetDate = null;
  //   await this.userRepository.save(user);
  // }
  //
  // public async forgotPassword(email: string): Promise<void> {
  //   const user: User = await this.userRepository.findOne({
  //     where: {
  //       email,
  //     },
  //   });
  //
  //   if (!user) {
  //     throw new BadRequestException(
  //       'Não foi possível recuperar senha. O e-mail informado não foi encontrado.',
  //     );
  //   }
  //
  //   const resetKey: string = new RandomUtils().generateResetKey().toString();
  //
  //   await this.userRepository.save({
  //     ...user,
  //     resetKey,
  //     resetDate: new Date(),
  //   });
  //
  //   this.mailService.sendResetPasswordInit({
  //     email: user.email,
  //     key: resetKey,
  //     name: user.username,
  //   });
  // }
}
