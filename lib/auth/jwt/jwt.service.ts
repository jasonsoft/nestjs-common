import { Inject, Injectable, Logger, Optional } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JWT_MODULE_OPTIONS } from '../../constants';
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
    return jwt.sign(payload, this.options.secret, this.options.signOptions);
  }

  createTokenAsync(payload: JwtUser): Promise<string | undefined> {
    const signOptions = this.options.signOptions || {};
    return new Promise((resolve, reject) =>
      jwt.sign(payload, this.options.secret, signOptions, (err, token) =>
        err ? reject(err) : resolve(token),
      ),
    );
  }

  verifyToken(token: string): JwtUser {
    return jwt.verify(
      token,
      this.options.secret,
      this.options.verifyOptions,
    ) as JwtUser;
  }
}
