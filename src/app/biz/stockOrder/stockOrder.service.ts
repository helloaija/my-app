import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class StockOrderService {
    listStockOrderUrl = "/admin/stockOrder/listStockOrderPage";
    saveProductUrl = '/admin/product/saveProductInfo';
    delProductUrl = '/admin/product/delProductInfo';
    getStockOrderUrl = '/admin/stockOrder/getStockOrderInfo';

    getStockOrders(params): Observable<Object> {
        return this.http.get(`${this.listStockOrderUrl}`, {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : params});
    }

    saveProduct(params): Observable<Object> {
        return this.http.post(`${this.saveProductUrl}`, null, {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : params});
    }

    delProduct(productId): Observable<Object> {
        return this.http.post(`${this.delProductUrl}`, null,
            {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : {productId: productId}});
    }

    getStockOrder(stockId): Observable<Object> {
        return this.http.get(`${this.getStockOrderUrl}`, {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : {stockId: stockId}});
    }

    constructor(private http: HttpClient) {
    }
}
