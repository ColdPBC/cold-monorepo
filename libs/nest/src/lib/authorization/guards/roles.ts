import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { tracer } from 'dd-trace';
import { filter, first } from 'lodash';
import { Span } from 'nestjs-ddtrace';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { BaseWorker } from '../../worker';
import { CacheService } from '../../cache';
import { AuthenticatedUser } from '../../primitives';
import { Organizations } from '../../../validation';
import { isRabbitContext } from '@golevelup/nestjs-rabbitmq';
import { PrismaService } from '../../prisma';

@Injectable()
@Span()
export class RolesGuard extends BaseWorker implements CanActivate {
  constructor(private reflector: Reflector, private readonly cache: CacheService, private prisma: PrismaService) {
    super('RolesGuard');
  }

  async resolveRequest(request: any, user: AuthenticatedUser, roles: Array<string>) {
    let isValid = false;
    let orgId = '';
    const isColdAdmin = user?.coldclimate_claims?.roles?.includes('cold:admin');

    const dd_user = {
      id: user?.sub,
      email: user?.coldclimate_claims?.email,
      org_id: user?.coldclimate_claims?.org_id,
    };

    tracer.setUser(dd_user);
    const tags = {
      action: 'resolveRequest',
      user: user.coldclimate_claims,
      required_roles: roles,
      url: request.url,
      method: request.method,
      query: request.query,
      params: request.params,
    };

    this.logger.setTags(tags);

    this.tracer.getActiveSpan()?.addTags(tags);

    // Check if organization is being requested by name
    //neither nameOrId nor orgId parameters contain an Auth0 org ID so find the orgId by name
    if ((request?.params?.nameOrId || request?.params?.orgId) && (!request?.params?.nameOrId?.includes('org_') || !request?.params?.orgId?.includes('org_'))) {
      // since org was requested by name get all orgs from cache and filter by name
      const orgs = (await this.cache.get('organizations')) as Organizations[];
      let org: any = first(
        filter(orgs, {
          name: request?.params?.nameOrId ? request?.params?.nameOrId : request?.params?.orgId,
        }),
      );

      if (!org) {
        this.logger.warn(`Unable to find cached org by name ${request?.params?.nameOrId | request?.params?.orgId}`);

        org = await this.prisma.organizations.findUnique({
          where: {
            name: request?.params?.nameOrId ? request?.params?.nameOrId : request?.params?.orgId,
          },
        });

        if (!org) {
          throw new NotFoundException(`Unable to locate organization ${request?.params?.nameOrId ? request?.params?.nameOrId : request?.params?.orgId} in cache or db`);
        }
      }

      orgId = org?.id; //set org id to the ID of the org that matched by name
    }

    //Check for impersonation flag
    if (request?.query?.impersonateOrg) {
      if (isColdAdmin) {
        orgId = request?.query?.impersonateOrg;
      }
    } else {
      // ignore whatever was passed to impersonate org
      orgId = request?.params?.orgId;
    }

    // check if orgId matches claims
    if (orgId !== user?.coldclimate_claims?.org_id) {
      // if not check if they are cold admin
      if (isColdAdmin) {
        // Log if cold:admin is impersonating an org
        this.logger.warn(`User: ${user?.coldclimate_claims?.email} is impersonating user for org: ${orgId}`);
        return true;
      } else {
        // Non cold:admin attempted to impersonate a different org
        this.logger.error(`User: ${user?.coldclimate_claims?.email} attempted to impersonate a user in another org: ${orgId}`);
        tracer.appsec.trackCustomEvent('invalid-impersonation-attempt', dd_user);

        throw new UnauthorizedException(`User: ${user?.coldclimate_claims?.email} attempted to impersonate a user in another org: ${orgId}`);
      }
    }

    // check if user's role is allowed
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
    // Do nothing if this is a RabbitMQ event
    if (isRabbitContext(context)) {
      return true;
    }

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
