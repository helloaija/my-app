import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class BuyerService {
    listBuyerUrl = "/admin/buyer/listUserPage";
    insertBuyerUrl = '/admin/buyer/insertUserInfo';
    updateBuyerUrl = '/admin/buyer/updateUserInfo';
    getBuyerUrl = '/admin/buyer/getUserInfo';

    listBuyer(params): Observable<Object> {
        return this.http.get(`${this.listBuyerUrl}`, {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : params});
    }

    insertBuyer(params): Observable<Object> {
        return this.http.post(`${this.insertBuyerUrl}`, null, {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : params});
    }

    updateBuyer(params): Observable<Object> {
        return this.http.post(`${this.updateBuyerUrl}`, null,
            {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : params});
    }

    getBuyer(userId): Observable<Object> {
        return this.http.get(`${this.getBuyerUrl}`, {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : {userId: userId}});
    }

    constructor(private http: HttpClient) {
    }
}
