import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SurveysUpdateInterceptor implements NestInterceptor {
  /**
   * Intercepts the put/patch/post surveys request and strips out the value, progress, ai_response, ai_answered, and ai_attempted fields and as such should not be applied to requests that store these fields
   * @param context
   * @param next
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();

    if (request.body) {
      delete request.body.progress;
      const keys = Object.keys(request.body.definition.sections);
      for (const qkey of keys) {
        const qkeys = Object.keys(request.body.definition.sections[qkey].follow_up);
        for (const q of qkeys) {
          delete request.body.definition.sections[qkey].follow_up[q].ai_response;
          delete request.body.definition.sections[qkey].follow_up[q].ai_answered;
          delete request.body.definition.sections[qkey].follow_up[q].ai_attempted;
          delete request.body.definition.sections[qkey].follow_up[q].value;
          delete request.body.definition.sections[qkey].follow_up[q].skipped;
          delete request.body.definition.sections[qkey].follow_up[q].score;

          if (request.body.definition.sections[qkey].follow_up[q].additional_context) {
            delete request.body.definition.sections[qkey].follow_up[q].additional_context.ai_response;
            delete request.body.definition.sections[qkey].follow_up[q].additional_context.ai_answered;
            delete request.body.definition.sections[qkey].follow_up[q].additional_context.ai_attempted;
            delete request.body.definition.sections[qkey].follow_up[q].additional_context.value;
            delete request.body.definition.sections[qkey].follow_up[q].additional_context.skipped;
            delete request.body.definition.sections[qkey].follow_up[q].additional_context.score;
          }
        }
      }
    }
    return next.handle().pipe(map(data => data));
  }
}
