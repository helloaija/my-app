import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class UserBillService {
    listUserBillAmount = "/admin/sellOrder/listUserOrderSumPage";

    getUserBillAmounts(params): Observable<Object> {
        return this.http.get(`${this.listUserBillAmount}`, {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : params});
    }

    constructor(private http: HttpClient) {
    }
}
