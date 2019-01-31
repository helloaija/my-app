import {Injectable} from "@angular/core";

@Injectable()
export class CommonUtils {
    constructor() {
    }

    nullTrim(params) {
        for (let key in params) {
            if (params[key] == null) {
                delete params[key];
            }
        }

        return params;
    }
}
