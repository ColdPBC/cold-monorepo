import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IAuthenticatedUser } from '../primitives';

@Injectable()
export class RabbitMetadataInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as IAuthenticatedUser;
    const orgId = request.params?.orgId;

    if (orgId && user) {
      // check that user org matches orgId specified in the request or that the user is a cold admin
      if (!user.isColdAdmin && user.coldclimate_claims.org_id !== orgId) {
        throw new UnauthorizedException('User is not a member of that organization');
      }
    }
    return next.handle();
  }
}
