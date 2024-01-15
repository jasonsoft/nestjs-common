/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtModuleOptions } from '../auth';
import {
  ANONYMOUS_METADATA,
  JWT_MODULE_OPTIONS,
  ROLES_METADATA,
} from '../constants';
import { JwtHelper } from '../helpers';
import { ReflectorHelper } from '../helpers/reflector.helper';
import { JwtUser } from '../interfaces';
import { getClientIp, parseAuthHeader } from '../utils';

/**
 * JWT extension options
 * Added by Jason.Song (成长的小猪) on 2023/03/04 22:49:28
 */
export interface JwtExtensionOptions {
  request: any;
  authHeaderValue: AuthHeaderValue;
}

/**
 * Authorization header value
 * Added by Jason.Song (成长的小猪) on 2023/03/16 23:17:29
 */
export interface AuthHeaderValue {
  scheme: string;
  token: string;
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
    const startTime = Date.now();
    const request = context.switchToHttp().getRequest();
    if (!request.startTime) {
      request.startTime = startTime;
    }
    const handler = context.getHandler();
    const classRef = context.getClass();
    if (
      ReflectorHelper.getAllAndOverride<boolean>(ANONYMOUS_METADATA, [
        handler,
        classRef,
      ])
    ) {
      return true;
    }

    let authHeaderValue: AuthHeaderValue | null | undefined;
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
      payload.clientIp = getClientIp(request);
      Reflect.set(request, 'user', payload);
      if (payload && payload.roles && payload.roles.length) {
        const userRoles = payload.roles;
        const roles = ReflectorHelper.getAllAndOverride<string[]>(
          ROLES_METADATA,
          [handler, classRef],
        );
        if (roles && roles.length) {
          const hasRole = roles.some((role) =>
            Array.isArray(userRoles)
              ? userRoles.includes(role)
              : userRoles === role,
          );
          if (!hasRole) {
            throw new UnauthorizedException();
          }
        }
      }
    } catch {
      throw new UnauthorizedException();
    }
    return this.validate(payload, { request, authHeaderValue });
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
   * Jwt extended authentication
   * Updated by Jason.Song (成长的小猪) on 2023/03/16 23:35:03
   */
  async validate(
    payload: JwtUser,
    extensionOptions?: JwtExtensionOptions,
  ): Promise<boolean> {
    return Promise.resolve(true);
  }
}
