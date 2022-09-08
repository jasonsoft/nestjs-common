import { SetMetadata } from '@nestjs/common';
import { BYPASS_RESPONSE_FORMAT } from '../constants';

/**
 * Bypass response format interceptors
 * Added by Jason.Song (成长的小猪) on 2022/09/07 14:02:12
 */
export const BypassResponseFormat = () =>
  SetMetadata(BYPASS_RESPONSE_FORMAT, true);
