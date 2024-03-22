// custom-interceptor.ts
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Scope, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAuthenticatedUser, PrismaService } from '@coldpbc/nest';
import { ConfigService } from '@nestjs/config';

@Injectable({ scope: Scope.REQUEST })
export class OrgUserInterceptor implements NestInterceptor {
  constructor(private readonly config: ConfigService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<unknown>> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as IAuthenticatedUser;
    const orgId = request.params?.orgId;
    const prisma = new PrismaService(this.config);

    if (user) {
      let org;
      // has orgId in the request
      if (orgId) {
        // throw if the user isn't a cold admin and the orgId in the request doesn't match the user's orgId
        if (!user.isColdAdmin && user.coldclimate_claims.org_id !== orgId) {
          throw new UnauthorizedException('Invalid organization id provided');
        }

        // since the user is a cold:admin, get the org from the database matching the orgId
        org = await prisma.organizations.findUnique({
          where: {
            id: orgId,
          },
        });

        // Add orgId to the request object
        request.orgId = org?.id;
      } else {
        // if the user is cold:admin and the org_id is undefined (ie: they are logged in using an API token rather than a UI token)
        if (user.isColdAdmin && user.coldclimate_claims.org_id === undefined) {
          org = await prisma.organizations.findUnique({
            where: {
              name: `cold-climate-${process.env['NODE_ENV']}`,
            },
          });
        } else {
          // get the org from the database matching the user's orgId
          org = await prisma.organizations.findUnique({
            where: {
              id: user.coldclimate_claims.org_id,
            },
          });
        }
      }

      // check that user org matches orgId specified in the request or that the user is a cold admin
      if (!org) {
        throw new UnauthorizedException('Invalid organization id provided');
      }

      request.organization = org;

      prisma.$disconnect();
    }

    return next.handle().pipe(map(data => data));
  }
}
