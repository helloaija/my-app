import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class RoleService {
    getRolesUrl = '/admin/role/loadRolePage';

    getRoles(): Observable<Object> {
        return this.http.get(`${this.getRolesUrl}`, {headers: {'X-Requested-With': 'XMLHttpRequest'}});
    }

    constructor(private http: HttpClient) {
    }
}
