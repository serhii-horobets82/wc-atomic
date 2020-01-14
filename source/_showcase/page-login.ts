import {customElement, html, property, TemplateResult} from 'lit-element';
import {PageAbstract} from './page-abstract';
import {SecureService} from '@domoskanonos/frontend-basis';
import {
    AuthenticatedFailureEventData,
    AuthenticatedSuccessfullyEventData,
    AuthenticationComponent,
    FormComponentOutputData,
    LogoutEventData
} from '..';

@customElement('page-login')
export class PageLogin extends PageAbstract {
    @property()
    isAuthenticated: boolean = SecureService.getInstance().isAuthenticated();

    getMainComponent(): TemplateResult {
        return html`
         <component-flex-container containerClazz="container_50" itemFlexBasisValue="100%">
            <component-authentication @component-authentication-event-login="${(event: CustomEvent) => this.login(event)}"  @component-authentication-event-logout="${() => this.logout()}" .isAuthenticated="${this.isAuthenticated}"></component-authentication>
         </component-flex-container>
      `;
    }

    logout() {
        SecureService.getInstance()
            .logout('/dologout')
            .then((isAuthenticated: boolean) => {
                this.isAuthenticated = isAuthenticated;
                let eventData: LogoutEventData = {};
                this.dispatchSimpleCustomEvent(AuthenticationComponent.EVENT_AUTHENTICATION_LOGOUT, eventData);
            });
    }

    login(event: CustomEvent) {
        let formOutputData: FormComponentOutputData = event.detail;
        SecureService.getInstance().login(formOutputData.formData, "#dashboard", "#login");
    }

}
