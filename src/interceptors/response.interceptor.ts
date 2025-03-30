import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HealthCheckResult } from 'src/types/health-check.types';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => ({
        status_code: response.statusCode,
        detail: data,
        result: HealthCheckResult.WORKING,
      })),
      catchError((err) => {
        const statusCode = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
        response.status(statusCode);

        return of({
          status_code: statusCode,
          detail: {
            error: err.message || 'Unexpected error',
          },
          result: HealthCheckResult.NOT_WORKING,
        });
      }),
    );
  }
}
