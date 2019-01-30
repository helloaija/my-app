import {Injectable} from "@angular/core";

@Injectable()
export class CommonService {
    constructor() {
    }

    getJwtToken(): string {
        return localStorage.getItem("jwtToken");
    }

    setJwtToken(jt: string): void {
        localStorage.setItem("jwtToken", jt);
    }
}
