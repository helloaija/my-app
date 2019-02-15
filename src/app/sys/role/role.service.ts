import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class RoleService {
    getRolesUrl = '/admin/role/loadRolePage';
    getRoleUrl = '/admin/role/getRoleById';
    getMenusUrl = '/admin/menu/queryMenuTree';
    addRoleUrl = '/admin/role/addRole';
    editRoleUrl = '/admin/role/editRole';
    delRoleUrl = '/admin/role/delRole';


    getRoles(params): Observable<Object> {
        return this.http.get(`${this.getRolesUrl}`, {headers: {'X-Requested-With': 'XMLHttpRequest'}, params: params});
    }

    getRoleAndMenu(roleId): Observable<Object> {
        return this.http.get(`${this.getRoleUrl}`, {
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            params: {roleId: roleId}
        });
    }

    getMenus(): Observable<Object> {
        return this.http.get(`${this.getMenusUrl}`, {headers: {'X-Requested-With': 'XMLHttpRequest'}});
    }

    addRole(params): Observable<Object> {
        return this.http.post(`${this.addRoleUrl}`, null, {
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            params: params
        });
    }

    updateRole(params): Observable<Object> {
        return this.http.post(`${this.editRoleUrl}`, null, {
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            params: params
        });
    }

    delRole(roleId): Observable<Object> {
        let ids = [];
        ids.push(roleId);
        return this.http.post(`${this.delRoleUrl}`, null, {
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            params: {roleIds: ids}
        });
    }

    constructor(private http: HttpClient) {
    }
}
