import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable()
export class LoginService {
    constructor(private http: HttpClient) {

    }

    doLogin(username: string, password: string) {
        let params = {username: username, password: password};

        return this.http.post("/admin/login", null, {params: params});
    }
}
