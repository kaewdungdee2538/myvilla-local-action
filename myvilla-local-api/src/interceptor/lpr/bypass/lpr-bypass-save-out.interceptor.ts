import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class LPRByPassSaveOutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
     // changing request
    let request = context.switchToHttp().getRequest();
  
    request.cookie = {
        action_type:'OUT'
        ,action_type_contrac:'O'
        ,type:'LPRBYPASS'
        ,type_contrac:'LPRBY'
    };
    
   return next.handle().pipe(map(flow => {
       return flow;
     }),
   );
  }
}