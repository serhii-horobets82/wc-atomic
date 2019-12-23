import { css, customElement, html, property, query, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { FormComponent, FormComponentOutputData } from '../form/component';
import { HttpClientService } from '@domoskanonos/frontend-basis';
import { HTMLInputTypes, TypographyTypes } from '..';

const componentCSS = require('./component.css');

export class LoginInputData extends AbstractInputData {}

export class AuthenticatedSuccessfullyEventData {}

export class AuthenticatedFailureEventData {
   reason?: string;
}

export class LogoutEventData {}

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
   isAuthenticated: boolean = false;

   @property()
   loginPath: string = '';

   @property()
   logoutPath: string = '';

   render() {
      return !this.isAuthenticated
         ? html`
              <component-card>
                 <component-form id="authenitcate-form" @oninvalid="${()=>alert('INVALID')}">
                    <component-typography .type="${TypographyTypes.H4}"
                       >${this.getI18NValue('component_authentication')}</component-typography
                    >
                    <component-inputfield
                       name="username"
                       .type="${HTMLInputTypes.EMAIL}"
                       label="${this.getI18NValue('component_authentication_username')}"
                       trailingIcon="account_circle"
                       required="true"
                    ></component-inputfield>
                    <component-inputfield
                       .type="${HTMLInputTypes.PASSWORD}"
                       label="${this.getI18NValue('component_authentication_password')}"
                       name="password"
                       trailingIcon="vpn_key"
                       required="true"
                    ></component-inputfield>
                    <component-button
                       text="${this.getI18NValue('component_authentication_login')}"
                       @click="${() => this.login()}"
                       disabled="true"
                    ></component-button>
                 </component-form>
              </component-card>
           `
         : html`
              <component-card>
                 <component-form id="logout-form">
                    <component-typography .type="${TypographyTypes.H4}"
                       >${this.getI18NValue('component_authentication')}</component-typography
                    >
                    <component-button
                       text="${this.getI18NValue('component_authentication_logout')}"
                       @click="${() => this.logout()}"
                    ></component-button>
                 </component-form>
              </component-card>
           `;
   }

   private login() {
      if (this.formComponent != null) {
         alert(this.formComponent.isValid());
         let formOutputData: FormComponentOutputData = this.formComponent.getOutputData();
         let loginPromise = HttpClientService.getInstance().login(this.loginPath, formOutputData.formData);
         loginPromise
            .then((isAuthenticated: boolean) => {
               this.isAuthenticated = isAuthenticated;
               if (this.isAuthenticated) {
                  console.log('successfully authenitcated.');
                  let eventData: AuthenticatedSuccessfullyEventData = {};
                  this.dispatchSimpleCustomEvent(AuthenticationComponent.EVENT_AUTHENTICATION_SUCCESSFULLY, eventData);
               }
            })
            .catch((reason: string) => {
               console.log('authenitcate failure, reason: ' + reason);
               this.isAuthenticated = false;
               let eventData: AuthenticatedFailureEventData = { reason: reason };
               this.dispatchSimpleCustomEvent(AuthenticationComponent.EVENT_AUTHENTICATION_FAILURE, eventData);
            });
      }
   }

   private logout() {
      HttpClientService.getInstance()
         .logout(this.logoutPath)
         .then((isAuthenticated: boolean) => {
            this.isAuthenticated = isAuthenticated;
            let eventData: LogoutEventData = {};
            this.dispatchSimpleCustomEvent(AuthenticationComponent.EVENT_AUTHENTICATION_LOGOUT, eventData);
         });
   }

   protected inputDataChanged() {}

   getDefaultInputData(): LoginInputData {
      return <LoginInputData>{
         componentIdentifier: AuthenticationComponent.IDENTIFIER
      };
   }

   getOutputData(): any {
      return undefined;
   }

   getEventList(): string[] {
      return [
         AuthenticationComponent.EVENT_AUTHENTICATION_LOGOUT,
         AuthenticationComponent.EVENT_AUTHENTICATION_SUCCESSFULLY,
         AuthenticationComponent.EVENT_AUTHENTICATION_FAILURE
      ];
   }
}
