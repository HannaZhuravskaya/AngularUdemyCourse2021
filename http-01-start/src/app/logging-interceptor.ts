import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

export class LoggingInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Notes:  intercept with a request
        console.log('Outgoing request');
        console.log('url: ' + req.url);
        console.log(req.headers);

        // Notes:  intercept with a response
        return next.handle(req).pipe(tap(event => {
            if (event.type === HttpEventType.Response) {
                console.log('Incoming response');
                console.log(event.body);
            }
        }));
    }
}