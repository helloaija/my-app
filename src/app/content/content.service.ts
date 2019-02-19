import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class ContentService {
    getUserInfoUrl = '/admin/user/getUserInfo';
    logoutUrl = '/admin/user/logout';

    getUserInfo(): Observable<Object> {
        return this.http.get(`${this.getUserInfoUrl}`, {headers: {'X-Requested-With': 'XMLHttpRequest'}});
    }

    logout(): Observable<Object> {
        return this.http.post(`${this.logoutUrl}`, null, {headers: {'X-Requested-With': 'XMLHttpRequest'}});
    }

    constructor(private http: HttpClient) {
    }
}
