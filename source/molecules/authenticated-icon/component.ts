import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../abstract/component/component';
import {AuthenticatedIconInputData} from "./model";
import {httpClient} from "../../app/data/data";
import {router} from "../../util/router";

const componentCSS = require('./component.scss');

@customElement('component-authenticated-icon')
export class AuthenticatedIconComponent extends AbstractComponent<AuthenticatedIconInputData, any> {
    static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

    static IDENTIFIER: string = 'AuthenticatedIconComponent';

    @property()
    isAuthenticated: boolean = httpClient.isAuthenticated();

    render() {
        return this.isAuthenticated ? html`
         <component-icon iconClazz="fas fa-sign-out-alt" clickable="true" @click="${() => this.logout()}"></component-icon>
      ` : html`
         <component-icon iconClazz="fas fa-sign-in-alt" clickable="true" @click="${() => this.login()}"></component-icon>        
      `;
    }


    getDefaultInputData(): AuthenticatedIconInputData {
        return <AuthenticatedIconInputData>{
            componentIdentifier: AuthenticatedIconComponent.IDENTIFIER,
            isAuthenticated: false,
            loginPage: '#login',
            logoutPage: '#login'
        }
    }

    inputDataChanged() {
        this.isAuthenticated = this.inputData.isAuthenticated;
    }

    getOutputData(): any {
        return undefined;
    }

    private login() {
        router.navigate(this.inputData.loginPage);
    }

    private logout() {
        router.navigate(this.inputData.logoutPage);
    }

}
