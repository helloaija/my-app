import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class SellProductMonthService {
    listSellProductMonthPageUrl = "/admin/statistics/listSellProductMonthPage";

    getSellProductMonths(params): Observable<Object> {
        return this.http.get(`${this.listSellProductMonthPageUrl}`, {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : params});
    }

    constructor(private http: HttpClient) {
    }
}
