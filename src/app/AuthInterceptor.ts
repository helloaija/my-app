import {CommonService} from './common/CommonService';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router,
                private messageBar: NzMessageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authToken = CommonService.getJwtToken();

        let authReq = req;
        // let authReq = req.clone({
        //     headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
        // });
        if (authToken != null && authToken != '' && authToken.trim() != '') {
            authReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + authToken)
            });
        }

        return next.handle(authReq).pipe(tap(event => {
        }, err => {
            if (err['status'] == 401) {
                this.router.navigateByUrl('toLogin');
            } else if (err['status'] == 403) {
                this.messageBar.create('error', `无权限访问`);
            } else if (err['status'] == 500) {
                this.messageBar.create('error', err['error']);
            } else {
                this.messageBar.create('error', `系统异常`);
            }
        }));
    }
}
