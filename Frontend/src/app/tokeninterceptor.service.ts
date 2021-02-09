import { Injectable, Injector } from '@angular/core';
import{HttpInterceptor} from  "@angular/common/http"
import { AuthService } from './auth.service';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
@Injectable({
  providedIn: 'root'
})
export class TokeninterceptorService  implements HttpInterceptor{
//we have to implement the intercept  interface of httpinterceptor
constructor(private injector:Injector){}
intercept(req:any,nxt:any){
//implementation of intercept function //some req will come as input for intercept woll modify
//and send that as the next req for the server side
let authService = this.injector.get(AuthService);
let tokenizedRequest = req.clone(
  {
    setHeaders:{
      Authorization : `Bearer ${authService.getToken()}`
    }
  }
)
return nxt.handle(tokenizedRequest);
}
}
