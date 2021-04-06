import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class EstampInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
     // changing request
    let request = context.switchToHttp().getRequest();
  
    request.cookie = {
        action_type:'ESTAMP'
        ,action_type_contrac:'ESM'
        ,type:'ESTAMP'
        ,type_contrac:'ESM'
    };
    
   return next.handle().pipe(map(flow => {
       return flow;
     }),
   );
  }
}