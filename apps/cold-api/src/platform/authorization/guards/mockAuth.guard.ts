import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ModuleRef, Reflector } from '@nestjs/core';
import { tracer } from 'dd-trace';
import { set } from 'lodash';
import { Span } from 'nestjs-ddtrace';
import { WorkerLogger } from '../../worker/worker.log.service';

@Injectable()
@Span()
export class MockAuthGuard extends AuthGuard('jwt') {
  logger: WorkerLogger = new WorkerLogger('MockAuthGuard');

  constructor(private reflector: Reflector, private moduleRef: ModuleRef) {
    super({
      passReqToCallback: true,
    });
  }

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    req.user = {
      email: 'test@test.com',
      coldclimate_claims: { roles: ['company:admin'] },
    };
    return true;
  }

  handleRequest(err, user) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user.id) {
      throw err || new UnauthorizedException();
    }

    const claims = user?.coldclimate_claims;

    if (user && claims) {
      const dd_user = {
        id: user?.sub,
        email: claims?.email,
        org_id: claims?.org_id,
      };

      tracer.appsec.setUser(dd_user);
    }

    claims?.roles?.map(role => {
      set(user, 'isAdmin', role.includes('admin'));
      set(user, 'isOwner', role.includes('owner'));
      set(user, 'isColdAdmin', role.includes('cold:admin'));
      set(user, 'isMember', role.includes('member'));
    });

    this.logger.log(`user is authenticated`, user);

    return user;
  }
}
