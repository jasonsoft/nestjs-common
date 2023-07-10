import { SetMetadata } from '@nestjs/common';
import { ANONYMOUS_METADATA } from '../constants';

/**
 * Anonymous access, bypass authorization verification
 * Added by Jason.Song on 2021/12/07 15:02:45
 */
export const Anonymous = () => SetMetadata(ANONYMOUS_METADATA, true);
