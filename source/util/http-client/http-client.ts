export enum ContentType {
    FORM = 'application/x-www-form-urlencoded', JSON = 'application/json', XML = 'application/xml'
}

export enum CorsMode {
    SAME_ORIGIN = 'same-origin', CORS = 'cors', NO_CORS = 'no-cors'
}

export enum Credentials {
    SAME_ORIGIN = 'same-origin', INCLUDE = 'include', OMIT = 'omit'
}

export class HttpConfigImpl implements HttpClientIF {
    credentials = Credentials.INCLUDE;
    cors = CorsMode.CORS;
    defaultContentType = 'application/json';
    //baseURL = 'http://v220190910399797452.supersrv.de:8095';
    baseURL = 'http://91.132.144.173:8095';
    //baseURL = 'http://localhost:8095';
}

export interface HttpClientIF {
    credentials: string;
    cors: string;
    defaultContentType: string;
    baseURL: string;
}

export class HttpClient {

    private _config: HttpConfigImpl;

    constructor(config: HttpConfigImpl) {
        this._config = config;
    }

    public sendFormData(url: string, formData: FormData) {
        console.log('send form data {}', formData);
        let urlSearchParams: URLSearchParams = new URLSearchParams();
        formData.forEach((value, key) => {
            urlSearchParams.append(key, value.toString());
        });
        return this.post(url, ContentType.FORM, urlSearchParams);
    }

    public get(url: string, contentType: string = this._config.defaultContentType) {
        return this.createFetch('GET', url, contentType);
    }

    public post(url: string, contentType: string = this._config.defaultContentType, body: any) {
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

        //headers['Access-Control-Allow-Origin'] = '*';
        //headers['Access-Control-Allow-Credentials'] = true;
        //headers['Accept'] = '*/*';

        if (contentType != undefined) {
            console.log('set content type header: ', contentType);
            headers['Content-Type'] = contentType;
        }

        if (this.isLoggedIn()) {
            console.log('set basic authentication header. ');
            //headers['Authorization'] = 'Basic ' + this.getJSessionId();
        }
        console.log("body: " + JSON.stringify(body));

        console.log('set request method: ' + method);

        //mode: this._config.cors,
        const requestOptions: RequestInit = {
            headers: headers,
            method: method,
            body: body,
            credentials: this._config.credentials
        };

//redirect: "follow"
        //credentials: this._config.credentials,


            let completeURL = this._config.baseURL + url;
        console.log('request url: ' + completeURL);

        const response = await fetch(completeURL, requestOptions);
        console.info('response status: ', response.status);
        return response;

    }

    public isLoggedIn() {
        let isLoggedIn = this.getJSessionId() != null;
        console.log('isLoggedIn: ' + isLoggedIn);
        return isLoggedIn;
    }


    getJSessionId() {
        let jsId = document.cookie.match(/JSESSIONID=[^;]+/);
        if (jsId != null) {
            return jsId[0].substring(11);
        }
        return jsId;
    }

}
