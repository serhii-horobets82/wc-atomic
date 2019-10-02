import {BooleanType} from "../constants";

export enum ContentType {
    FORM = 'application/x-www-form-urlencoded', JSON = 'application/json', XML = 'application/xml'
}

export enum CorsMode {
    SAME_ORIGIN = 'same-origin', CORS = 'cors', NO_CORS = 'no-cors'
}

export enum Credentials {
    SAME_ORIGIN = 'same-origin', INCLUDE = 'include', OMIT = 'omit'
}


export enum HttpStatusEnum {
    OK = 200,
}

export enum HttpClientSessionKey {
    AUTHENTICATED = 'AUTHENTICATED',
}


export class HttpConfigImpl implements HttpClientIF {
    credentials = Credentials.INCLUDE;
    cors = CorsMode.CORS;
    defaultContentType = 'application/json';
    //baseURL = 'http://v220190910399797452.supersrv.de:8095';
    baseURL = 'http://91.132.144.173:8095';
    //baseURL = 'http://localhost:8095';
    loginPath = '/dologin';
    logoutPath = '/dologout';
}

export interface HttpClientIF {
    credentials: string;
    cors: string;
    defaultContentType: string;
    baseURL: string;
    loginPath: string;
    logoutPath: string;
}

export class HttpClient {

    private _config: HttpConfigImpl;

    constructor(config: HttpConfigImpl) {
        this._config = config;
    }

    public async logout() {
        let response = await this.get(this._config.logoutPath);
        if (response.status == HttpStatusEnum.OK) {
            console.log('logout successfully.');
            sessionStorage.setItem(HttpClientSessionKey.AUTHENTICATED, BooleanType.FALSE);
        }
        return this.isAuthenticated();
    }

    public async login(formData: FormData) {
        let response = await this.sendFormData(this._config.loginPath, formData);
        if (response.status == HttpStatusEnum.OK) {
            console.log('login successfully.');
            sessionStorage.setItem(HttpClientSessionKey.AUTHENTICATED, BooleanType.TRUE);
        } else {
            console.log('login failure.');
            sessionStorage.setItem(HttpClientSessionKey.AUTHENTICATED, BooleanType.FALSE);
        }
        return this.isAuthenticated();
    }

    public isAuthenticated() {
        return BooleanType.TRUE == sessionStorage.getItem(HttpClientSessionKey.AUTHENTICATED);
    }

    public sendFormData(url: string, formData: FormData) {
        console.log('send form data {}', formData);
        let urlSearchParams: URLSearchParams = new URLSearchParams();
        formData.forEach((value, key) => {
            urlSearchParams.append(key, value.toString());
        });
        return this.post(url, urlSearchParams, ContentType.FORM);
    }

    public get(url: string, contentType: string = this._config.defaultContentType) {
        return this.createFetch('GET', url, contentType);
    }

    public post(url: string, body: any, contentType: string = this._config.defaultContentType) {
        return this.createFetch('POST', url, contentType, body);
    }

    public put(url: string, body: any, contentType: string = this._config.defaultContentType) {
        return this.createFetch('PUT', url, contentType, body);
    }

    public patch(url: string, body: any, contentType: string = this._config.defaultContentType) {
        return this.createFetch('PATCH', url, contentType, body);
    }

    public delete(url: string, contentType: string = this._config.defaultContentType) {
        return this.createFetch('DELETE', url, contentType);
    }

    private async createFetch(method: string, url: string, contentType: string | undefined, body?: any) {

        let headers: any = {};

        if (contentType != undefined) {
            console.log('set content type header: ', contentType);
            headers['Content-Type'] = contentType;
        }

        if (this.isAuthenticated()) {
            console.log('set basic authentication header. ');
            //headers['Authorization'] = 'Basic ' + this.getJSessionId();
        }
        console.log("body: " + JSON.stringify(body));

        console.log('set request method: ' + method);

        const requestOptions: RequestInit = {
            headers: headers,
            method: method,
            body: body,
            credentials: this._config.credentials,
        };

        //redirect: "manual"

        let completeURL = this._config.baseURL + url;
        console.log('request url: ' + completeURL);

        const response = await fetch(completeURL, requestOptions);
        console.info('response status: ', response.status);
        return response;

    }

    getJSessionId() {
        var jsId: RegExpMatchArray | null = document.cookie.match(/JSESSIONID=[^;]+/);
        console.log(jsId);
        if (jsId != null) {
            if (jsId instanceof Array)
                return jsId[0].substring(11);
            else if (jsId instanceof String)
                return String(jsId).substring(11);
        }
        return jsId;
    }

}
