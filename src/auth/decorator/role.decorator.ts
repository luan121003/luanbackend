import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/auth/decorator/role.enum';

export const ROLES_KEY = 'role';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
