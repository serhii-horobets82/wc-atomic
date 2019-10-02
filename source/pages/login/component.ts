import {customElement, html, TemplateResult} from 'lit-element';
import {BlankTemplate} from "../../templates/blank/template";
import {router} from "../../util/router";
import {DatalistOption} from "../../input/datalist/model";
import {sessionStore} from "../../util/storage/storage";
import {httpClient, Konzern, User} from "../../app/data/data";


@customElement('page-login')
export class LoginPage extends BlankTemplate {

    constructor() {
        super();

    }

    getContent(): TemplateResult {
        return html` 
 
 <component-flex-container gridClazz="grid_100 maxPadding"  columnFlexBasisValue="100%;">
 
 <component-img clazz="imageWidthHundred" src="http://v220190910399797452.supersrv.de/img/login.jpg"></component-img>

 
 <component-authentication @component-authentication-event-success="${() => this.successfullyLoggedIn()}" @component-authentication-event-logout="${() => this.successfullyLoggedOut()}"></component-authentication>

</component-flex-container>

`;
    }

    private successfullyLoggedIn() {

        let responsePromiseCompany = httpClient.get('/COMPANY');
        responsePromiseCompany.then(response => {
            let responseTextPromise = response.text();
            responseTextPromise.then(responseText => {
                let companies: Konzern[] = JSON.parse(responseText);
                let companyOptions: DatalistOption[] = [];
                companies.forEach(company => {
                    companyOptions.push(<DatalistOption>{text: company.firmenname, value: company.idl + ''})
                });
                sessionStore.addData("companies", JSON.stringify(companyOptions));
            });
        });


        let responsePromiseUser = httpClient.get('/SYSTEM/AUTH/USER');
        responsePromiseUser.then(response => {
            let responseTextPromise = response.text();
            responseTextPromise.then(responseText => {
                let user: User = JSON.parse(responseText);
                sessionStore.addData("user", JSON.stringify(user));
            })
        })

        router.navigate("#dashboard");
    }

    private successfullyLoggedOut() {

        sessionStore.removeData('user');
        sessionStore.removeData('companies');

        router.navigate("#login");
    }
}