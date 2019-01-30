import {CommonService} from "./common/CommonService";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {finalize, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import 'rxjs/add/operator/do';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private commonServie: CommonService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authToken = this.commonServie.getJwtToken();

        let authReq = req;
        // let authReq = req.clone({
        //     headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
        // });
        if (authToken != null && authToken != '' && authToken.trim() != '') {
            authReq = req.clone({
                headers: req.headers.set('Authorization', "Bearer " + authToken)
            });
        }

        return next.handle(authReq);
            // .pipe(resp => {debugger
            //     if (resp instanceof HttpResponse) {
            //         console.log('Response is ::');
            //         console.log(resp.body)
            //     }
            //     return resp;
            // }, err => {debugger
            //     console.log(err);
            //     if (err instanceof HttpResponse)
            //     {
            //         console.log(err.status);
            //         console.log(err.body);
            //     }
            //
            //     return Observable.of(err);
            // });

    }

    // return next.handle(authReq).pipe(
        //     tap(
        //         // Succeeds when there is a response; ignore other events
        //         event => {if (event instanceof HttpResponse ? 'succeeded' : '') {
        //
        //         }},
        //         // Operation failed; error is an HttpErrorResponse
        //         error => {
        //             if (error['status'] == 401) {
        //                 return;
        //             }
        //         }
        //     ),
        //     // Log when response observable either completes or errors
        //     finalize(() => {
        //     })
        // );
    // }

}
