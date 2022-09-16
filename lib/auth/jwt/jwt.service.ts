import { Inject, Injectable, Logger, Optional } from '@nestjs/common';
import { JWT_MODULE_OPTIONS } from '../../constants';
import { JwtHelper } from '../../helpers';
import { JwtUser } from '../../interfaces';
import { JwtModuleOptions } from './interfaces';

@Injectable()
export class JwtService {
  private readonly logger = new Logger('JwtService');

  constructor(
    @Optional()
    @Inject(JWT_MODULE_OPTIONS)
    private readonly options: JwtModuleOptions,
  ) {}

  createToken(payload: JwtUser) {
    return JwtHelper.sign(
      payload,
      this.options.secret,
      this.options.signOptions,
    );
  }

  createTokenAsync(payload: JwtUser): Promise<string | undefined> {
    const signOptions = this.options.signOptions || {};
    return JwtHelper.signAsync(payload, this.options.secret, signOptions);
  }

  verifyToken(token: string): JwtUser {
    return JwtHelper.verify<JwtUser>(
      token,
      this.options.secret,
      this.options.verifyOptions,
    );
  }

  verifyTokeAsync(token: string): Promise<JwtUser> {
    return JwtHelper.verifyAsync<JwtUser>(
      token,
      this.options.secret,
      this.options.verifyOptions,
    );
  }
}
