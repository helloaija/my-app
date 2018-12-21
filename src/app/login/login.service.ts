import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {

  }

  doLogin() {
    return this.http.get(`/platformData.php?mod=issue&ajax=1&action=getIssueHistogram&province_id=0`);
  }
}
