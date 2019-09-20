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
    credentials = Credentials.SAME_ORIGIN;
    cors = CorsMode.SAME_ORIGIN;
    defaultContentType = 'application/json';
    baseURL = 'http://v220190910399797452.supersrv.de:8095';
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
        return this.createFetch('POST', url, undefined, formData);
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

        if (contentType != undefined) {
            headers['Content-Type'] = contentType;
        }


        //{
        //  'Content-Type': ContentType.FORM,
        // 'Access-Control-Allow-Origin': '*',
        //}

        const requestOptions: RequestInit = {
            headers: headers,
            method: method,
            mode: 'no-cors'
        };
        //mode: 'no-cors'

        if (body) {
            console.log("body: " + JSON.stringify(body));
            requestOptions.body = body;
        }

        console.log('requestOptions: {}', requestOptions);

        let completeURL = this._config.baseURL + url;
        console.log('request url: ' + completeURL);

        const response = await fetch(completeURL, requestOptions);

        if (response.ok) {
            return response;
        } else {
            let message = await response.text();
            try {
                message = JSON.parse(message).message;
            } catch (e) {
            }
            message = message || response.statusText;
            return Promise.reject(message);
        }
    }
}
