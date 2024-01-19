// custom-interceptor.ts
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticatedUser } from '@coldpbc/nest';

@Injectable()
export class OrgUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as AuthenticatedUser;
    const orgId = request.params?.orgId;

    if (orgId && user) {
      // check that user org matches orgId specified in the request or that the user is a cold admin
      if (!user.isColdAdmin && user.coldclimate_claims.org_id !== orgId) {
        throw new UnauthorizedException('Invalid organization id provided');
      }
    }

    // Add orgId to the request object
    request.orgId = orgId;

    return next.handle().pipe(map(data => data));
  }
}
