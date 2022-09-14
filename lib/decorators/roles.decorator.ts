import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../constants';

export const Roles = <T = any>(...roles: T[]) => SetMetadata(ROLES_KEY, roles);
