import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class StockProductMonthService {
    listStockProductMonthPageUrl = "/admin/statistics/listStockProductMonthPage";

    getStockProductMonths(params): Observable<Object> {
        return this.http.get(`${this.listStockProductMonthPageUrl}`, {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : params});
    }

    constructor(private http: HttpClient) {
    }
}
