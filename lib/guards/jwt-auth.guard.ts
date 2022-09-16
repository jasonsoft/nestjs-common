import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Optional,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtModuleOptions } from '../auth';
import { ANONYMOUS_KEY, JWT_MODULE_OPTIONS, ROLES_KEY } from '../constants';
import { JwtHelper } from '../helpers';
import { ReflectorHelper } from '../helpers/reflector.helper';
import { JwtUser } from '../interfaces';
import { parseAuthHeader } from '../utils';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Optional()
    @Inject(JWT_MODULE_OPTIONS)
    protected options: JwtModuleOptions,
  ) {}
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
      throw new UnauthorizedException(
        'You need to provide your Token in the Authorization header, e.g. Authorization: Bearer <Token>',
      );
    }
    try {
      const token = authorization.token;
      const payload = await JwtHelper.verifyAsync<JwtUser>(
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

      return await this.validate(token, payload);
    } catch {
      throw new UnauthorizedException();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validate(token: string, payload: JwtUser): Promise<boolean> {
    return Promise.resolve(true);
  }
}
