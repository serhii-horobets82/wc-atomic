import {customElement, TemplateResult, html, query} from 'lit-element';
import {BlankTemplate} from "../../templates/blank/template";
import {TeaserComponent} from "../../molecules/teaser/component";
import {TextWithHeaderComponent} from "../../molecules/text-with-header/component";
import {FormComponent} from "../../organisms/form/component";
import {HttpClient, HttpClientConfig} from "../../util/http-client";
import {FormComponentOutputData} from "../../organisms/form/model";


@customElement('page-login')
export class LoginPage extends BlankTemplate {

    @query('#login-form')
    formComponent: FormComponent | undefined;

    constructor() {
        super();
    }

    getContent(): TemplateResult {
        return html`
                    <component-form id="login-form" @component-button-click="${(event: CustomEvent) => this.formButtonClicked(event)}">
                        <component-form-element label="Benutzername">
                            <component-textfield name="email"></component-textfield>
                        </component-form-element>
                        <component-form-element label="Passwort">
                            <component-textfield type="password" name="password"></component-textfield>
                        </component-form-element>
                        <component-button text="Registrieren"></component-button>
                        <component-button text="Anmelden" clickEventData="login"></component-button>
                    </component-form>

`;
    }

    private formButtonClicked(event: CustomEvent) {
        let data = event.detail;
        console.log("login-form button clicked, data=" + data);
        switch (data) {
            case 'login':
                if (this.formComponent != null) {
                    let formOutputData: FormComponentOutputData = this.formComponent.getOutputData();

                    console.log(formOutputData.data);


                    let httpClient: HttpClient = new HttpClient(<HttpClientConfig>{baseURL: 'http://localhost:8095/SYSTEM/AUTH/REGISTER'});
                    let promise = httpClient.post('', formOutputData.data);
                    promise.then(value => {
                        console.log(JSON.stringify(value));
                    });

                }
                break;
        }

    }
}