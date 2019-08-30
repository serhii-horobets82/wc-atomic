export interface HttpClientConfig {
   baseURL: string;
}

export class HttpClient {
   constructor(public config: HttpClientConfig) {}

   public get(url: string) {
      return this.createFetch('GET', url);
   }

   public post(url: string, body: any) {
      return this.createFetch('POST', url, body);
   }

   public put(url: string, body: any) {
      return this.createFetch('PUT', url, body);
   }

   public patch(url: string, body: any) {
      return this.createFetch('PATCH', url, body);
   }

   public delete(url: string) {
      return this.createFetch('DELETE', url);
   }

   //application/json
   //headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true' },
//         mode: 'no-cors',
   private async createFetch(method: string, url: string, body?: any) {
      const requestOptions: RequestInit = {
         headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true'
         },
          mode: 'no-cors',
         method: method
      };

      //,credentials: 'include'
      if (body) {
         requestOptions.body = JSON.stringify(body);
      }
      let completeURL = this.config.baseURL + url;
      console.log('request url: ' + completeURL);
      const response = await fetch(completeURL, requestOptions);
      if (response.ok) {
         return response;
      } else {
         let message = await response.text();
         try {
            message = JSON.parse(message).message;
         } catch (e) {}
         message = message || response.statusText;
         return Promise.reject(message);
      }
   }
}
