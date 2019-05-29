import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class SellProductDetailedListService {
    getSellProductPageUrl = "/admin/statistics/getSellProductPage";
    exportSellProductDetailUrl = "/admin/statistics/exportSellProductDetail";

    getSellProductPage(params): Observable<Object> {
        return this.http.get(`${this.getSellProductPageUrl}`, {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : params});
    }

    exportSellProductDetailFile(params): Observable<Object> {
        return this.http.post(`${this.exportSellProductDetailUrl}`, null,
            {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : params, 'responseType': 'blob', 'observe': 'response'});
    }

    constructor(private http: HttpClient) {
    }
}
