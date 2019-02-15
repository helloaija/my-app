import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class UserService {
    getUsersUrl = '/admin/user/loadUserInfoList';
    getUserUrl = '/admin/user/getUserRoleData';
    addUserUrl = '/admin/user/addUser';
    updateUserUrl = '/admin/user/updateUser';
    delUserUrl = '/admin/user/delUser';

    getUsers(params): Observable<Object> {
        return this.http.get(`${this.getUsersUrl}`, {headers: {'X-Requested-With': 'XMLHttpRequest'}, params: params});
    }

    /**
     * 获取用户信息及其对应角色，如果userId为空则取角色信息
     * @param userId
     */
    getUserAndRole(userId): Observable<Object> {
        return this.http.get(`${this.getUserUrl}`, {
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            params: {userId: userId}
        });
    }

    /**
     * 添加用户信息
     * @param params
     */
    addUser(params): Observable<Object> {
        return this.http.post(`${this.addUserUrl}`, null, {
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            params: params
        });
    }

    updateUser(params): Observable<Object> {
        return this.http.post(`${this.updateUserUrl}`, null, {
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            params: params
        });
    }

    delUser(userId): Observable<Object> {
        let ids = [];
        ids.push(userId);
        return this.http.post(`${this.delUserUrl}`, null, {
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            params: {ids: ids}
        });
    }

    constructor(private http: HttpClient) {
    }
}
