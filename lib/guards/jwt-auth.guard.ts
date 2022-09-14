import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '../auth';
import { ANONYMOUS_KEY, ROLES_KEY } from '../constants';
import { ReflectorHelper } from '../helpers/reflector.helper';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
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
    const authorization = this.parseAuthHeader(
      request.headers['authorization'],
    );
    if (!authorization) {
      throw new UnauthorizedException(
        'You need to provide your API key in the Authorization header, e.g. Authorization: Bearer <Your API key>',
      );
    }
    try {
      const user = this.jwtService.verifyToken(authorization.value);
      Reflect.set(request, 'user', user);
      const roles = ReflectorHelper.getAllAndOverride<any[]>(ROLES_KEY, [
        handler,
        classRef,
      ]);
      if (roles && roles.length) {
        const hasRole = user && roles.some((role) => user.roles.includes(role));
        if (!hasRole) {
          throw new UnauthorizedException();
        }
      }
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  parseAuthHeader(value?: string): {
    scheme: string;
    value: string;
  } | null {
    if (!value) {
      return null;
    }
    const re = /(\S+)\s+(\S+)/;
    const matches = value.match(re);
    return matches && { scheme: matches[1], value: matches[2] };
  }
}
