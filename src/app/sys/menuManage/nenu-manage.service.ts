import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class MenuManageService {
    queryMenuTreeUrl = "/admin/menu/queryMenuTree";
    addMenuUrl = '/admin/menu/addMenu';
    deleteMenuUrl = '/admin/menu/deleteMenu';
    getMenuUrl = '/admin/menu/getMenuById';
    updateMenuUrl = '/admin/menu/updateMenu';

    /**
     * 获取菜单树
     */
    getMenuTree(): Observable<Object> {
        return this.http.get(`${this.queryMenuTreeUrl}`, {
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        });
    }

    /**
     * 添加节点
     * @param params
     */
    addMenu(params): Observable<Object> {
        return this.http.post(`${this.addMenuUrl}`, null, {
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            params: params
        });
    }

    /**
     * 删除节点
     * @param menuId
     */
    deleteMenu(menuId): Observable<Object> {
        return this.http.post(`${this.deleteMenuUrl}`, null,
            {headers: {'X-Requested-With': 'XMLHttpRequest'}, params: {menuId: menuId}});
    }

    /**
     * 获取节点数据
     * @param menuId
     */
    getMenu(menuId): Observable<Object> {
        return this.http.get(`${this.getMenuUrl}`, {
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            params: {menuId: menuId}
        });
    }

    /**
     * 更新节点
     * @param params
     */
    updateMenu(params): Observable<Object> {
        return this.http.post(`${this.updateMenuUrl}`, null, {
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            params: params
        });
    }

    constructor(private http: HttpClient) {
    }
}
