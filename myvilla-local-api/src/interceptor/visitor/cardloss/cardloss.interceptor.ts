import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class CardLossInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
     // changing request
    let request = context.switchToHttp().getRequest();
  
    request.cookie = {
        action_type:'CARDLOSS'
        ,action_type_contrac:'CL'
        ,type:'VISITOR'
        ,type_contrac:'V'
    };
    
   return next.handle().pipe(map(flow => {
       return flow;
     }),
   );

  }
  
}

