import {Injectable} from "@angular/core";

@Injectable()
export class CommonService {
    constructor() {
    }

    static getJwtToken(): string {
        return localStorage.getItem("jwtToken");
    }

    static setJwtToken(jt: string): void {
        localStorage.setItem("jwtToken", jt);
    }
}
