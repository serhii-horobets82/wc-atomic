import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { RouterService } from '@domoskanonos/frontend-basis';

const componentCSS = require('./component.scss');

export class AuthenticatedIconInputData extends AbstractInputData {
   isAuthenticated?: boolean;
   loginPage?: string;
   logoutPage?: string;
}

@customElement('component-authenticated-icon')
export class AuthenticatedIconComponent extends AbstractComponent<AuthenticatedIconInputData, any> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'AuthenticatedIconComponent';

   constructor() {
      super();
   }

   @property()
   isAuthenticated: boolean = false;

   @property()
   loginPage: string = '';

   @property()
   logoutPage: string = '';

   render() {
      return this.isAuthenticated
         ? html`
              <component-icon
                 title="${this.getI18NValue('component_authentication_icon_title_logout')}"
                 iconClazz="fas fa-sign-out-alt"
                 clickable="true"
                 @click="${() => this.logout()}"
              ></component-icon>
           `
         : html`
              <component-icon
                 title="${this.getI18NValue('component_authentication_icon_title_login')}"
                 iconClazz="fas fa-sign-in-alt"
                 clickable="true"
                 @click="${() => this.login()}"
              ></component-icon>
           `;
   }

   getDefaultInputData(): AuthenticatedIconInputData {
      return <AuthenticatedIconInputData>{
         componentIdentifier: AuthenticatedIconComponent.IDENTIFIER,
         isAuthenticated: false,
         loginPage: '#login',
         logoutPage: '#login'
      };
   }

   inputDataChanged() {
      this.isAuthenticated = this.basicService.getValue(this.inputData.isAuthenticated, false);
      this.loginPage = this.basicService.getValue(this.inputData.loginPage, '');
      this.logoutPage = this.basicService.getValue(this.inputData.logoutPage, '');
   }

   getOutputData(): any {
      return undefined;
   }

   private login() {
      RouterService.getInstance().navigate(this.loginPage);
   }

   private logout() {
      RouterService.getInstance().navigate(this.logoutPage);
   }
}