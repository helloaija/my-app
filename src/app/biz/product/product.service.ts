import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class ProductService {
    listProductUrl = "/admin/product/listProductPage";
    saveProductUrl = '/admin/product/saveProductInfo';
    delProductUrl = '/admin/product/delProductInfo';
    getProductUrl = '/admin/product/getProductInfo';

    getProducts(params): Observable<Object> {
        return this.http.get(`${this.listProductUrl}`, {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : params});
    }

    saveProduct(params): Observable<Object> {
        return this.http.post(`${this.saveProductUrl}`, null, {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : params});
    }

    delProduct(productId): Observable<Object> {
        return this.http.post(`${this.delProductUrl}`, null,
            {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : {productId: productId}});
    }

    getProduct(productId): Observable<Object> {
        return this.http.get(`${this.getProductUrl}`, {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : {productId: productId}});
    }

    constructor(private http: HttpClient) {
    }
}
