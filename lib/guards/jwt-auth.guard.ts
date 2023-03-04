/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtModuleOptions } from '../auth';
import { ANONYMOUS_KEY, JWT_MODULE_OPTIONS, ROLES_KEY } from '../constants';
import { JwtHelper } from '../helpers';
import { ReflectorHelper } from '../helpers/reflector.helper';
import { JwtUser } from '../interfaces';
import { parseAuthHeader } from '../utils';

/**
 * JWT extension options
 * Added by Jason.Song (成长的小猪) on 2023/03/04 22:49:28
 */
export interface JwtExtensionOptions {
  request: any;
}

/**
 *  JWT Guard
 * Updated by Jason.Song (成长的小猪) on 2023/03/01 23:18:46
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  @Inject(JWT_MODULE_OPTIONS)
  protected options!: JwtModuleOptions;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const handler = context.getHandler();
    const classRef = context.getClass();
    if (
      ReflectorHelper.getAllAndOverride<boolean>(ANONYMOUS_KEY, [
        handler,
        classRef,
      ])
    ) {
      return true;
    }

    let authHeaderValue:
      | {
          scheme: string;
          token: string;
        }
      | null
      | undefined;
    const headers = ['authorization'];
    const mixedAuthHeaders = this.options.mixedAuthHeaders;
    if (mixedAuthHeaders) {
      if (typeof mixedAuthHeaders === 'string') {
        headers.push(mixedAuthHeaders);
      } else {
        headers.push(...mixedAuthHeaders);
      }
    }

    for (const name of headers) {
      const value: string = request.headers[name.toLowerCase()];
      if (value) {
        authHeaderValue =
          name === 'authorization'
            ? parseAuthHeader(value)
            : { scheme: name, token: value };
        break;
      }
    }
    if (!authHeaderValue) {
      throw new UnauthorizedException(
        'You need to provide your Token in the Authorization header, e.g. Authorization: Bearer <Token>',
      );
    }
    let payload: JwtUser;
    try {
      payload = await this.decryptToken(
        authHeaderValue.scheme,
        authHeaderValue.token,
      );
      Reflect.set(request, 'user', payload);
      if (payload && payload.roles && payload.roles.length) {
        const userRoles = payload.roles;
        const roles = ReflectorHelper.getAllAndOverride<any[]>(ROLES_KEY, [
          handler,
          classRef,
        ]);
        if (roles && roles.length) {
          const hasRole = roles.some((role) => userRoles.includes(role));
          if (!hasRole) {
            throw new UnauthorizedException();
          }
        }
      }
    } catch {
      throw new UnauthorizedException();
    }
    return this.validate(authHeaderValue.token, payload, { request });
  }

  /**
   * decrypt token
   * Added by Jason.Song (成长的小猪) on 2023/03/04 22:18:29
   */
  async decryptToken(scheme: string, token: string): Promise<JwtUser> {
    return JwtHelper.verifyAsync<JwtUser>(
      token,
      this.options.secret,
      this.options.verifyOptions,
    );
  }

  /**
   * validate
   * Updated by Jason.Song (成长的小猪) on 2023/03/01 23:27:01
   */
  async validate(
    token: string,
    payload: JwtUser,
    extensionOptions?: JwtExtensionOptions,
  ): Promise<boolean> {
    return Promise.resolve(true);
  }
}
