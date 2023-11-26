import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { WorkerLogger } from '@coldpbc/nest';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  logger = new WorkerLogger('TransformInterceptor');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe();
  }
}
