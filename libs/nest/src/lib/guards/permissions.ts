// src/permissions.ts

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Span } from 'nestjs-ddtrace';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { BaseWorker, WorkerLogger } from '../worker';

@Injectable()
@Span()
export class PermissionsGuard extends BaseWorker implements CanActivate {
  override logger: WorkerLogger = new WorkerLogger('PermissionsGuard');

  constructor(private readonly reflector: Reflector) {
    super('PermissionsGuard');
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const routePermissions = this.reflector.get<string[]>('permissions', context.getHandler());

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const userPermissions = context.getArgs()[0].user.permissions;

    this.setTags({
      action: 'resolveRequest',
      user: user.coldclimate_claims,
      required_roles: roles,
      url: request.url,
      method: request.method,
      required_permissions: routePermissions,
      user_permissions: userPermissions,
      query: request.query,
      params: request.params,
    });

    if (!routePermissions) {
      this.logger.log(`no permissions required for this route`);
      return true;
    }

    const hasPermission = () => routePermissions.every(routePermission => userPermissions.includes(routePermission));

    const status = hasPermission();
    this.logger.info(`user has permission`, {
      routePermissions,
      userPermissions,
      hasPermission: status
    });

    return status;
  }
}
