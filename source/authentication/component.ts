import { css, customElement, html, property, query, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { FormComponent, FormComponentOutputData } from '../form/component';
import { HttpClientService } from '@domoskanonos/frontend-basis';
import { InputfieldType, TypographyType } from '..';

const componentCSS = require('./component.css');

export class LoginInputData extends AbstractInputData {}

export class AuthenticatedSuccessfullyEventData {}

export class AuthenticatedFailureEventData {
   reason?: string;
}

export class LogoutEventData {}

@customElement('component-authentication')
export class AuthenticationComponent extends AbstractComponent<LoginInputData, FormComponentOutputData> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'AuthenticationComponent';

   static EVENT_AUTHENTICATION_LOGIN: string = 'component-authentication-event-login';

   static EVENT_AUTHENTICATION_LOGOUT: string = 'component-authentication-event-logout';

   constructor() {
      super();
   }

   @query('#authenitcate-form')
   formComponent: FormComponent | undefined;

   @property()
   isAuthenticated: boolean = false;

   @property()
   errorMessage: string = '';

   render() {
      return !this.isAuthenticated
         ? html`
              <component-card>
                 <component-form id="authenitcate-form">
                    <component-typography .typographyType="${TypographyType.H4}"
                       >${this.getI18NValue('component_authentication')}</component-typography
                    >
                    <component-inputfield
                       name="username"
                       .inputfieldType="${InputfieldType.EMAIL}"
                       label="${this.getI18NValue('component_authentication_username')}"
                       trailingIcon="account_circle"
                       required="true"
                    ></component-inputfield>
                    <component-inputfield
                       .inputfieldType="${InputfieldType.PASSWORD}"
                       label="${this.getI18NValue('component_authentication_password')}"
                       name="password"
                       trailingIcon="vpn_key"
                       required="true"
                    ></component-inputfield>
                    <component-button
                       text="${this.getI18NValue('component_authentication_login')}"
                       @component-button-click="${() => this.login()}"
                    ></component-button>
                 </component-form>
              </component-card>
           `
         : html`
              <component-card>
                 <component-form id="logout-form">
                    <component-typography .typographyType="${TypographyType.H4}"
                       >${this.getI18NValue('component_authentication')}</component-typography
                    >
                    <component-button
                       text="${this.getI18NValue('component_authentication_logout')}"
                       @click="${() => this.logout()}"
                    ></component-button>

                    <component-typography
                       slot="errorMessages"
                       .typographyType="${TypographyType.OVERLINE}"
                       text="${this.errorMessage}"
                    ></component-typography>
                    
                 </component-form>
              </component-card>
           `;
   }

   private login() {
      if (this.formComponent != null && this.formComponent.validate()) {
         this.dispatchSimpleCustomEvent(AuthenticationComponent.EVENT_AUTHENTICATION_LOGIN, this.getOutputData());
      }
   }

   private logout() {
      this.dispatchSimpleCustomEvent(AuthenticationComponent.EVENT_AUTHENTICATION_LOGOUT, this.getOutputData());
   }

   protected inputDataChanged() {}

   getOutputData(): FormComponentOutputData {
      return this.formComponent != undefined ? this.formComponent.getOutputData() : FormComponentOutputData.prototype;
   }

   getEventList(): string[] {
      return [AuthenticationComponent.EVENT_AUTHENTICATION_LOGIN, AuthenticationComponent.EVENT_AUTHENTICATION_LOGOUT];
   }
}
