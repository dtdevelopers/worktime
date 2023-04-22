import { IsString } from 'class-validator';

export class ChangePassword {
  @IsString({ message: 'O campo senha atual é obrigatório.' })
  currentPassword: string;
  @IsString({ message: 'O campo nova senha é obrigatório.' })
  newPassword: string;
}
