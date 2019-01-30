import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class ProductService {
    randomUserUrl = 'https://api.randomuser.me/';
    listProductPage = "/admin/product/listProductPage";

    getUsers(pageIndex: number = 1, pageSize: number = 10, sortField: string, sortOrder: string, genders: string[]): Observable<{}> {
        let params = new HttpParams()
            .append('page', `${pageIndex}`)
            .append('results', `${pageSize}`)
            .append('sortField', sortField)
            .append('sortOrder', sortOrder);
        genders.forEach(gender => {
            params = params.append('gender', gender);
        });
        return this.http.get(`${this.randomUserUrl}`, {
            params
        });
    }

    getProducts(): Observable<Object> {
        let params = {a : 'a'};
        return this.http.get(`${this.listProductPage}`, {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : params});
    }

    constructor(private http: HttpClient) {
    }
}
