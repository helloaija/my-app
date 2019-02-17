import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class StockOrderService {
    listStockOrderUrl = "/admin/stockOrder/listStockOrderPage";
    getStockOrderUrl = '/admin/stockOrder/getStockOrderInfo';
    addStockOrderUrl = '/admin/stockOrder/addStockOrder';
    updateStockOrderUrl = '/admin/stockOrder/updateStockOrder';
    deleteStockOrderUrl = '/admin/stockOrder/deleteStockOrder';
    listProductUrl = "/admin/product/listProductPage";

    getStockOrders(params): Observable<Object> {
        return this.http.get(`${this.listStockOrderUrl}`, {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : params});
    }

    getStockOrder(stockId): Observable<Object> {
        return this.http.get(`${this.getStockOrderUrl}`, {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : {stockId: stockId}});
    }

    addStockOrder(params): Observable<Object> {
        return this.http.post(`${this.addStockOrderUrl}`, null, {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : params});
    }

    deleteStockOrder(orderId): Observable<Object> {
        return this.http.post(`${this.deleteStockOrderUrl}`, null,
            {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : {stockId: orderId}});
    }

    updateStockOrder(params): Observable<Object> {
        return this.http.post(`${this.updateStockOrderUrl}`, null, {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : params});
    }

    getProducts(params): Observable<Object> {
        return this.http.get(`${this.listProductUrl}`, {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : params});
    }

    constructor(private http: HttpClient) {
    }
}
