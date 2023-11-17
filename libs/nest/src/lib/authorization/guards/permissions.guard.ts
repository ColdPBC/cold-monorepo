// src/permissions.guard.ts

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Span } from 'nestjs-ddtrace';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { WorkerLogger } from 'nest';

@Injectable()
@Span()
export class PermissionsGuard implements CanActivate {
  logger: WorkerLogger = new WorkerLogger('PermissionsGuard');

  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const routePermissions = this.reflector.get<string[]>('permissions', context.getHandler());

    const userPermissions = context.getArgs()[0].user.permissions;

    if (!routePermissions) {
      this.logger.log(`no permissions required for this route`);
      return true;
    }

    const hasPermission = () => routePermissions.every(routePermission => userPermissions.includes(routePermission));

    this.logger.info(`user has permission`, {
      routePermissions,
      userPermissions,
      hasPermission: hasPermission(),
    });

    return hasPermission();
  }
}
