import {HttpClient} from "../../util/http-client/http-client";
import {Router} from "../../util/router";

export interface AppData {
    name: string;
    description: string;
    isSecured: boolean;
    loginPage: string;
    httpClient: HttpClient;
    router: Router;
}


