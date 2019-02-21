import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class SellOrderService {
    listSellOrderUrl = "/admin/sellOrder/listSellOrderPage";
    getSellOrderUrl = '/admin/sellOrder/getSellOrderInfo';
    addSellOrderUrl = '/admin/sellOrder/addSellOrder';
    updateSellOrderUrl = '/admin/sellOrder/updateSellOrder';
    deleteSellOrderUrl = '/admin/sellOrder/deleteSellOrder';
    listProductUrl = "/admin/product/listProductPage";
    listBuyerUrl = "/admin/buyer/listUserPage";

    getSellOrders(params): Observable<Object> {
        return this.http.get(`${this.listSellOrderUrl}`, {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : params});
    }

    getSellOrder(sellId): Observable<Object> {
        return this.http.get(`${this.getSellOrderUrl}`, {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : {sellId: sellId}});
    }

    addSellOrder(params): Observable<Object> {
        return this.http.post(`${this.addSellOrderUrl}`, null, {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : params});
    }

    deleteSellOrder(orderId): Observable<Object> {
        return this.http.post(`${this.deleteSellOrderUrl}`, null,
            {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : {sellId: orderId}});
    }

    updateSellOrder(params): Observable<Object> {
        return this.http.post(`${this.updateSellOrderUrl}`, null, {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : params});
    }

    getProducts(params): Observable<Object> {
        return this.http.get(`${this.listProductUrl}`, {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : params});
    }

    listBuyer(params): Observable<Object> {
        return this.http.get(`${this.listBuyerUrl}`, {headers: {'X-Requested-With': 'XMLHttpRequest'}, params : params});
    }

    constructor(private http: HttpClient) {
    }
}
