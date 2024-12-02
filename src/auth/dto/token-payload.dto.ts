import { Role } from 'src/auth/decorator/role.enum';

export class TokenPayloadDto {
  _id: string;
  email: string;
  name: string;
  role?: Role[];
}
