import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export default  class LoggerIntereptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('Before Route Handler');
    return next.handle().pipe(
      map((dataFromRouteHandler) => {
        const { password, ...other } = dataFromRouteHandler;
        return { ...other };
      }),
    );
  }
}
