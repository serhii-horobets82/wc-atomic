import {css, customElement, html, property, query, unsafeCSS} from "lit-element";
import {AbstractComponent} from '../../abstract/component/component';
import {
    AuthenticatedFailureEventData,
    AuthenticatedSuccessfullyEventData,
    LoginInputData,
    LogoutEventData
} from "./model";
import {FormComponentOutputData} from "../form/model";
import {FormComponent} from "../form/component";
import {APP_DATA} from "../../index";

const componentCSS = require('./component.css');

@customElement('component-authentication')
export class AuthenticationComponent extends AbstractComponent<LoginInputData, undefined> {
    static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

    static IDENTIFIER: string = 'AuthenticationComponent';

    static EVENT_AUTHENTICATION_SUCCESSFULLY: string = 'component-authentication-event-success';

    static EVENT_AUTHENTICATION_FAILURE: string = 'component-authentication-event-failure';

    static EVENT_AUTHENTICATION_LOGOUT: string = 'component-authentication-event-logout';

    constructor() {
        super();
    }

    @query('#authenitcate-form')
    formComponent: FormComponent | undefined;

    @property()
    isAuthenticated: boolean = APP_DATA.httpClient.isAuthenticated();

    render() {
        return !this.isAuthenticated ? html`
                    <component-form id="authenitcate-form">
                        <component-form-element label="${this.getI18NValue('component_authentication_username')}">
                            <component-inputfield name="username"></component-inputfield>
                        </component-form-element>
                        <component-form-element label="${this.getI18NValue('component_authentication_password')}">
                            <component-inputfield type="password" name="password"></component-inputfield>
                        </component-form-element>
                        <component-button text="${this.getI18NValue('component_authentication_login')}"  @click="${() => this.login()}"></component-button>
                    </component-form>` : html`
                    <component-form id="logout-form">
                        <component-button text="${this.getI18NValue('component_authentication_logout')}"  @click="${() => this.logout()}"></component-button>
                    </component-form>`;
    }

    private login() {
        if (this.formComponent != null) {
            let formOutputData: FormComponentOutputData = this.formComponent.getOutputData();
            let loginPromise = APP_DATA.httpClient.login(formOutputData.formData);
            loginPromise.then(isAuthenticated => {

                this.isAuthenticated = isAuthenticated;

                if (this.isAuthenticated) {

                    console.log('successfully authenitcated.');

                    let eventData: AuthenticatedSuccessfullyEventData = {};

                    this.dispatchSimpleCustomEvent(
                        AuthenticationComponent.EVENT_AUTHENTICATION_SUCCESSFULLY,
                        eventData
                    );

                }

            }).catch(reason => {

                console.log('authenitcate failure, reason: ' + reason);

                this.isAuthenticated = false;

                let eventData: AuthenticatedFailureEventData = {reason: reason};

                this.dispatchSimpleCustomEvent(
                    AuthenticationComponent.EVENT_AUTHENTICATION_FAILURE,
                    eventData
                );

            })
        }
    }

    private logout() {
        APP_DATA.httpClient.logout().then(isAuthenticated => {
            this.isAuthenticated = isAuthenticated;

            let eventData: LogoutEventData = {};

            this.dispatchSimpleCustomEvent(
                AuthenticationComponent.EVENT_AUTHENTICATION_LOGOUT,
                eventData
            );

        });
    }

    protected inputDataChanged() {
    }

    getDefaultInputData(): LoginInputData {
        return <LoginInputData>{
            componentIdentifier: AuthenticationComponent.IDENTIFIER,
        };
    }

    getOutputData(): any {
        return undefined;
    }

    getEventList(): string[] {
        return [AuthenticationComponent.EVENT_AUTHENTICATION_LOGOUT, AuthenticationComponent.EVENT_AUTHENTICATION_SUCCESSFULLY, AuthenticationComponent.EVENT_AUTHENTICATION_FAILURE];
    }

}
