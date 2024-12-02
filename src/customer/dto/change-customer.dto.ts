import { IsStrongPassword } from 'class-validator';

export class ChangePasswordDto {
  old_password: string;

  @IsStrongPassword()
  new_password: string;
}
