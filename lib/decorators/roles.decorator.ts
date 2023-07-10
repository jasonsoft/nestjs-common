import { SetMetadata } from '@nestjs/common';
import { ROLES_METADATA } from '../constants';

export const Roles = <T = any>(...roles: T[]) =>
  SetMetadata(ROLES_METADATA, roles);
