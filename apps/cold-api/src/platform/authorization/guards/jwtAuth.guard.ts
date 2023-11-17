import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ModuleRef, Reflector } from '@nestjs/core';
import { Span, TraceService } from 'nestjs-ddtrace';
import { IS_PUBLIC_KEY, WorkerLogger } from 'nest';
import { set } from 'lodash';

@Injectable()
@Span()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private tracer: TraceService, private logger: WorkerLogger, private reflector: Reflector, private moduleRef: ModuleRef) {
    super({
      passReqToCallback: true,
    });

    this.logger = new WorkerLogger('JwtAuthGuard', { service: process.env.NODE_PKG_NAME, version: process.env.NODE_PKG_VERSION });
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(info, user, err) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user.iss) {
      this.tracer.getTracer().appsec.trackCustomEvent('Login Failed', { error: err, user: user, info: info });
      throw new UnauthorizedException(err);
    }

    const claims = user?.coldclimate_claims;

    claims?.roles?.map(role => {
      set(user, 'isAdmin', role.includes('admin'));
      set(user, 'isOwner', role.includes('owner'));
      set(user, 'isColdAdmin', role.includes('cold:admin'));
      set(user, 'isMember', role.includes('member'));
    });

    if (user && claims) {
      const dd_user = {
        id: user?.sub,
        email: claims?.email,
        org_id: claims?.org_id,
      };

      this.tracer.getTracer().appsec.trackCustomEvent('Login Completed', { ...dd_user, info: info });
      this.tracer.getTracer().dogstatsd.increment('cold.api.login', 1, { ...dd_user, environment: process.env.NODE_ENV || 'development', status: 'completed' });
      this.tracer.getTracer().setUser(dd_user);
      this.tracer.getTracer().appsec.setUser(dd_user);
    }
    //this.logger.info(`user is authenticated`, user);
    return user;
  }
}
