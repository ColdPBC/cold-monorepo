import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { tracer } from 'dd-trace';
import { filter, first } from 'lodash';
import { Span } from 'nestjs-ddtrace';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { BaseWorker } from '../worker';
import { CacheService } from '../cache';
import { AuthenticatedUser } from '../primitives';
import { Organizations } from '@coldpbc/nest';

@Injectable()
@Span()
export class RolesGuard extends BaseWorker implements CanActivate {
  constructor(private reflector: Reflector, private readonly cache: CacheService) {
    super('RolesGuard');
  }

  async resolveRequest(request: any, user: AuthenticatedUser, roles: Array<string>) {
    let isValid = false;
    let orgId = '';

    const dd_user = {
      id: user?.sub,
      email: user?.coldclimate_claims?.email,
      org_id: user?.coldclimate_claims?.org_id,
    };

    tracer.setUser(dd_user);

    this.tracer.getActiveSpan()?.addTags({
      action: 'resolveRequest',
      user: user.coldclimate_claims,
      required_roles: roles,
      url: request.url,
      method: request.method,
      query: request.query,
      params: request.params,
    });
    // Check if organization is being requested by name
    if (
      (request?.params?.nameOrId || request?.params?.orgId) &&
      (!request?.params?.nameOrId?.includes('org_') || !request?.params?.orgId?.includes('org_')) //neither nameOrId nor orgId parameters contain an so filter by name
    ) {
      if (request?.params?.nameOrId) {
        // since org was requested by name get all orgs from cache and filter by name
        const orgs = (await this.cache.get('organizations')) as Organizations[];
        const org = first(
          filter(orgs, {
            name: request?.params?.nameOrId ? request?.params?.nameOrId : request?.params?.orgId,
          }),
        );

        orgId = org ? org?.id : '';
        if (!orgId) throw new NotFoundException(`Unable to find cached org by name ${request?.params?.nameOrId | request?.params?.orgId}`); //set org id to the ID of the org that matched by name
      }

      //Check for impersonation flag
      if (request?.query?.impersonateOrg) {
        if (user?.coldclimate_claims?.roles?.includes('cold:admin')) {
          orgId = request?.query?.impersonateOrg;
        }
      } else {
        // set orgId to match the id of the orgId passed in the request
        orgId = request?.params?.orgId;
      }

      if (orgId && orgId.startsWith('org_') && user.coldclimate_claims.org_id !== orgId && !user.isColdAdmin) {
        this.logger.error(`User: ${user?.coldclimate_claims?.email} attempted to impersonate a user in another org: ${orgId}`);
        tracer.appsec.trackCustomEvent('invalid-impersonation-attempt', dd_user);

        throw new UnauthorizedException(`User: ${user?.coldclimate_claims?.email} attempted to impersonate a user in another org: ${orgId}`);
      }

      if (orgId && orgId !== user?.coldclimate_claims?.org_id) {
        isValid = user?.coldclimate_claims?.roles?.includes('cold:admin');
        // Log if user is impersonating an admin
        if (isValid) {
          this.logger.warn(`User: ${user?.coldclimate_claims?.email} is impersonating user for org: ${orgId}`);
          return isValid;
        }
      }
    }

    for (const role of roles) {
      if (user?.coldclimate_claims?.roles?.includes(role)) {
        isValid = true;
        break;
      } else {
        this.logger.warn(`${role} not found in ${user?.coldclimate_claims?.roles}`);
      }
    }

    if (!isValid) {
      this.logger.error(`No matching roles found`);

      tracer.appsec.trackCustomEvent('missing-role', dd_user);

      throw new UnauthorizedException('You do not have the correct role to access this resources');
    }

    return isValid;
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    this.tracer.getTracer().appsec.setUser({
      id: user?.sub,
      email: user?.coldclimate_claims?.email,
      org_id: user?.coldclimate_claims?.org_id,
    });

    this.tracer.getTracer().setUser({
      id: user?.sub,
      email: user?.coldclimate_claims?.email,
      org_id: user?.coldclimate_claims?.org_id,
    });

    this.setTags({
      action: 'resolveRequest',
      user: user.coldclimate_claims,
      required_roles: roles,
      url: request.url,
      method: request.method,
      query: request.query,
      params: request.params,
    });

    if (!roles) {
      // this.logger.log(`no roles required for this route`);
      return true;
    }

    return this.resolveRequest(request, user, roles);
  }
}
