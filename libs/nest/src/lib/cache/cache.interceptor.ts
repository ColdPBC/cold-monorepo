import { CacheInterceptor } from '@nestjs/cache-manager';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class ColdCacheInterceptor extends CacheInterceptor {
  override trackBy(context: ExecutionContext): string | undefined {
    const cont = context.switchToHttp();
    const req = cont.getRequest();
    const parts = req.originalUrl.split('/');
    const key = parts[parts.length - 1];
    if (!req.user || !req.user?.coldclimate_claims?.email) {
      throw new Error('User not found in request object.');
    }
    return `organization:${req.params.orgId}:compliance:${req.params.name}:${key}`;
  }
}
