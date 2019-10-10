import {customElement, html, TemplateResult} from 'lit-element';
import {BlankTemplate} from "../../templates/blank/template";
import {router} from "../../util/router";

import {TextInputData} from "../../atoms/text/model";
import {TextComponent} from "../../atoms/text/component";
import {I18N} from "../../util/i18n-util";
import {SpacerInputData} from "../../atoms/spacer/model";
import {SpacerComponent} from "../../atoms/spacer/component";
import {I18NInputData} from "../../molecules/i18n-selector/model";
import {I18NSelectorComponent} from "../../molecules/i18n-selector/component";
import {KeyValueData} from "../../organisms/form/model";
import {HTTP_CLIENT, Konzern, User} from "../data/data";
import {BALCO_DATA_STORE} from "../data/balco_data";
import {DEFAULT_TEMPLATE_INPUT_DATA} from "../app-showcase";


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
        let responsePromiseUser = HTTP_CLIENT.get('/SYSTEM/AUTH/USER');
        responsePromiseUser.then(response => {
            let responseTextPromise = response.text();
            responseTextPromise.then(responseText => {
                let user: User = JSON.parse(responseText);
                BALCO_DATA_STORE.saveLoginUser(user);
                let responsePromiseCompany = HTTP_CLIENT.get('/COMPANY');
                responsePromiseCompany.then(response => {
                    let responseTextPromise = response.text();
                    responseTextPromise.then(responseText => {
                        let companies: Konzern[] = JSON.parse(responseText);
                        BALCO_DATA_STORE.saveKonzerne(companies);
                        router.navigate("#dashboard");
                    });
                });

            });
        });
    }

    private successfullyLoggedOut() {
        BALCO_DATA_STORE.logout();
        router.navigate("#login");
    }
}