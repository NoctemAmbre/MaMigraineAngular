import { Injectable, NgModule } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import 'rxjs/add/operator/do';

@Injectable()
export class HTTPIntercepteur implements HttpInterceptor{
    intercept(request:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{
        //console.log('processing request', request);
        //console.log('body', request.body);
        //console.log('Current User : ', JSON.parse(localStorage.getItem('currentUser')));
        //request.headers.append('Authtoken', 'Basic ' + localStorage.getItem('currentUser'));
        //console.log('body', request.headers);


        //console.log('Authorization avant : ', request.headers);
        //var dupReq = request.clone().headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Basic MyKey');
        
        
        
        
        //const dupReq = request.clone({headers:request.headers.set('Authorization', 'Bearer ' + 'a20e6aca-ee83-44bc-8033-b41f3078c2b6:c199f9c8-0548-4be79655-7ef7d7bf9d20')});
        //const dupReq = request.clone({headers:request.headers.set("WWW-Authenticate: Basic realm=\"MyWCFService\"")});
        
        //console.log('Authorization après : ', dupReq);

        // request.headers.append('Authtoken', 'Basic ' + localStorage.getItem('currentUser'));
        // const customReq = request.clone({
        //     headers:request.headers.set('app-language', 'fr')
        //     //headers:request.headers.set('Content-Type', 'application/x-www-form-urlencoded')
        // })
        // console.log(next);
        // return next
        // .handle(customReq)
        // .do((ev:HttpEvent<any>)=>{
        //     if (ev instanceof HttpResponse){
        //         console.log('processing response', ev);
        //     }
        //     return ev;
        // });
        

        return next.handle(request);
        //return next.handle(dupReq);
    }
}