import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class ProductEchartsService {
    getProductMonthDataUrl = "/admin/statistics/getProductMonthData";

    getProductMonthData(year): Observable<Object> {
        return this.http.get(`${this.getProductMonthDataUrl}`, {
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            params: {year: year}
        });
    }

    constructor(private http: HttpClient) {
    }
}
