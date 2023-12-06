import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ModuleRef, Reflector } from '@nestjs/core';
import { Span, TraceService } from 'nestjs-ddtrace';
import { IS_PUBLIC_KEY } from '../decorators';
import { BaseWorker, WorkerLogger } from '../worker';
import { set } from 'lodash';
import { ConfigService } from '@nestjs/config';

@Injectable()
@Span()
export class JwtAuthGuard extends AuthGuard('jwt') {
  logger: WorkerLogger;

  constructor(private tracer: TraceService, private reflector: Reflector, private moduleRef: ModuleRef, private config: ConfigService) {
    super({
      passReqToCallback: true,
    });

    this.logger = new WorkerLogger('JwtAuthGuard', {
      service: this.config.get('DD_SERVICE') || BaseWorker.getProjectName(),
      env: this.config.get('NODE_ENV') || this.config.getOrThrow('DD_ENV'),
      version: this.config.get('DD_VERSION') || BaseWorker.getPkgVersion(),
    });
  }

  override canActivate(context: ExecutionContext) {
    const { user, url, method, query, params } = context.switchToHttp().getRequest();
    const span = this.tracer.getActiveSpan();

    const ddUser = {
      id: user?.sub,
      email: user?.coldclimate_claims?.email,
      org_id: user?.coldclimate_claims?.org_id,
      roles: user?.coldclimate_claims?.roles,
    };

    span?.tracer().startSpan('jwtAuth', { tags: { user: ddUser, url, method, query, params } });

    this.tracer.getTracer().setUser(ddUser);
    this.tracer.getTracer().appsec.setUser(ddUser);

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
    if (isPublic) {
      return true;
    }

    const activated = super.canActivate(context);
    if (!activated) {
      this.tracer.getTracer().appsec.trackUserLoginFailureEvent(user.sub, false);
    }

    return activated;
  }

  override handleRequest(info: any, user: any, err: any) {
    const dd_user = {
      id: user?.sub,
      email: user?.coldclimate_claims?.email,
      org_id: user?.coldclimate_claims?.org_id,
    };

    this.tracer.getTracer().appsec.setUser(dd_user);

    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user.iss) {
      this.tracer.getTracer().appsec.trackCustomEvent('Login Failed', { error: err, user: user, info: info });
      throw new UnauthorizedException(err);
    }

    user?.coldclimate_claims?.roles?.map((role: any) => {
      set(user, 'isAdmin', role.includes('admin'));
      set(user, 'isOwner', role.includes('owner'));
      set(user, 'isColdAdmin', role.includes('cold:admin'));
      set(user, 'isMember', role.includes('member'));
    });

    if (user && user?.coldclimate_claims) {
      this.tracer.getTracer().appsec.trackUserLoginSuccessEvent(dd_user);
    }
    //this.logger.info(`user is authenticated`, user);
    return user;
  }
}
