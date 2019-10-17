import {customElement, html, TemplateResult} from 'lit-element';
import {BlankTemplate} from "../../templates/blank/template";
import {router} from "../../util/router";
import {BalanceOverview, HTTP_CLIENT, Konzern, User} from "../data/data";
import {BALCO_DATA_STORE} from "../data/balco_data";


@customElement('page-login')
export class AuthenticationPage extends BlankTemplate {

    constructor() {
        super();

    }

    getContent(): TemplateResult {
        return html` 
 
 <component-flex-container gridClazz="grid_100 maxPadding"  columnFlexBasisValue="100%;">
 
 <component-img clazz="imageWidthHundred" src="http://v220190910399797452.supersrv.de/img/Logo_REMONDIS_Claim_E_RGB_72dp.jpg"></component-img>

 
 <component-authentication @component-authentication-event-success="${() => this.successfullyLoggedIn()}" @component-authentication-event-logout="${() => this.successfullyLoggedOut()}"></component-authentication>

</component-flex-container>

`;
    }

    private successfullyLoggedIn() {
        this.doLoginRequests().then(() => {
            console.log('all login data received...');
            router.navigate("#dashboard");
        });
    }

    private successfullyLoggedOut() {
        BALCO_DATA_STORE.logout();
        router.navigate("#login");
    }

    async doLoginRequests() {
        let responseUser = await HTTP_CLIENT.get('/SYSTEM/AUTH/USER');
        let userBody = await responseUser.text()
        let user: User = JSON.parse(userBody);
        BALCO_DATA_STORE.saveLoginUser(user);

        let responseCompany = await HTTP_CLIENT.get('/COMPANY');
        let responseCompanyBody = await responseCompany.text();
        let companies: Konzern[] = JSON.parse(responseCompanyBody);
        BALCO_DATA_STORE.saveKonzerne(companies);

        await BALCO_DATA_STORE.loadBalanceData();

    }

}