import { HttpClientService, RouterService } from "@domoskanonos/frontend-basis";

export interface AppData {
    name: string;
    description: string;
    isSecured: boolean;
    loginPage: string;
    httpClient: HttpClientService;
    router: RouterService;
}


