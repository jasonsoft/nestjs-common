import { SetMetadata } from '@nestjs/common';
import { ANONYMOUS_KEY } from '../constants';

/**
 * 匿名访问
 * Added by Jason.Song on 2021/12/07 15:02:45
 */
export const Anonymous = () => SetMetadata(ANONYMOUS_KEY, true);
