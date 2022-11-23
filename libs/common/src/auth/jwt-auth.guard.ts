import { AUTH_SERVICE } from './services';
import {
  CanActivate,
  Inject,
  Injectable,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, tap, catchError } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authentication = this.getAuthentication(context);

    return this.authClient
      .send('validate_user', {
        Authentication: authentication,
      })
      .pipe(
        tap((res) => {
          this.addUser(res, context);
        }),
        catchError((err) => {
          throw new UnauthorizedException();
        }),
      );
  }

  private getAuthentication(context: ExecutionContext) {
    let authentication: string;

    if (context.getType() === 'http') {
      authentication = context.switchToHttp().getRequest()
        .cookies?.Authentication;
    } else if (context.getType() === 'rpc') {
      authentication = context.switchToRpc().getData().cookies?.Authentication;
    }

    if (!authentication) {
      throw new UnauthorizedException();
    }
    return authentication;
  }

  private addUser(user: any, context: ExecutionContext) {
    if (context.getType() === 'http') {
      context.switchToHttp().getRequest().user = user;
    } else if (context.getType() === 'rpc') {
      context.switchToRpc().getData().user = user;
    }
  }
}
