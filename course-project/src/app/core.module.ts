import { NgModule } from "@angular/core";

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "./auth/services/auth-interceptor.service";

@NgModule({
    // Notes: how provide service for app, lazy-loaded and eager-loaded modules
    // https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/14466516#overview
    // Notes: To avoid bugs - provide for 'root'
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }
    ]
})
export class CoreModule { }