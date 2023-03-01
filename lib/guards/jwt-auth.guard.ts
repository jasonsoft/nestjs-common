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
 *
 * Added by Jason.Song (成长的小猪) on 2023/03/01 23:22:51
 */
export interface AuthExtendedOptions {
  request: any;
}

/**
 *
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
    const authorization = parseAuthHeader(request.headers['authorization']);
    if (!authorization) {
      const mixedAuthHeaders = this.options.mixedAuthHeaders;
      if (mixedAuthHeaders) {
        const headers =
          typeof mixedAuthHeaders === 'string'
            ? [mixedAuthHeaders]
            : mixedAuthHeaders;
        if (headers.length > 0) {
          for (const name of headers) {
            const apiKey = request.headers[name.toLowerCase()];
            if (apiKey) {
              return this.validate(apiKey, undefined, { request });
            }
          }
        }
      }
      throw new UnauthorizedException(
        'You need to provide your Token in the Authorization header, e.g. Authorization: Bearer <Token>',
      );
    }
    const token = authorization.token;
    let payload: JwtUser;
    try {
      payload = await JwtHelper.verifyAsync<JwtUser>(
        token,
        this.options.secret,
        this.options.verifyOptions,
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
    return this.validate(token, payload, { request });
  }

  /**
   *
   * Updated by Jason.Song (成长的小猪) on 2023/03/01 23:27:01
   */
  async validate(
    token: string,
    payload?: JwtUser,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    extendedOptions?: AuthExtendedOptions,
  ): Promise<boolean> {
    return Promise.resolve(payload ? true : false);
  }
}
