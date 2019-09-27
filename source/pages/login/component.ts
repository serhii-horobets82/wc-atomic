import {customElement, TemplateResult, html, query, property} from 'lit-element';
import {BlankTemplate} from "../../templates/blank/template";
import {TeaserComponent} from "../../molecules/teaser/component";
import {TextWithHeaderComponent} from "../../molecules/text-with-header/component";
import {FormComponent} from "../../organisms/form/component";
import {HttpClient, HttpClientIF} from "../../util/http-client/http-client";
import {FormComponentOutputData} from "../../organisms/form/model";
import {httpClient} from "../../app/data/data";
import {router} from "../../util/router";


@customElement('page-login')
export class LoginPage extends BlankTemplate {

    @query('#login-form')
    formComponent: FormComponent | undefined;

    constructor() {
        super();
    }

    @property()
    isAuthenticated: boolean = httpClient.isAuthenticated();

    getContent(): TemplateResult {
        return !this.isAuthenticated ? html`
                    <component-form id="login-form">
                        <component-form-element label="Benutzername">
                            <component-textfield name="username"></component-textfield>
                        </component-form-element>
                        <component-form-element label="Passwort">
                            <component-textfield type="password" name="password"></component-textfield>
                        </component-form-element>
                        <component-button text="Anmelden"  @click="${() => this.login()}"></component-button>
                    </component-form>` : html`
                    <component-form id="logout-form">
                        <component-button text="Abmelden"  @click="${() => this.logout()}"></component-button>
                    </component-form>

`;
    }


    private logout() {
        httpClient.logout().then(isAuthenticated => {
            this.isAuthenticated = isAuthenticated;
        });
    }

    private login() {
        if (this.formComponent != null) {
            let formOutputData: FormComponentOutputData = this.formComponent.getOutputData();
            let loginPromise = httpClient.login(formOutputData.formData);
            loginPromise.then(isLoggedIn => {
                this.isAuthenticated = isLoggedIn;
                if (this.isAuthenticated) {
                    router.navigate("#balance");
                }
            }).catch(reason => {
                console.log('login failure, reason: ' + reason)
                this.isAuthenticated = false;
            })
        }
    }


}