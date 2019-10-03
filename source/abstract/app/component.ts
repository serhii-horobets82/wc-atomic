import {LitElement, TemplateResult} from "lit-element";
import {router} from "../../util/router";
import {CONFIGURATION, HTTP_CLIENT} from "../../app/data/data";

export abstract class AbstractApp extends LitElement {

    render() {
        return this.renderPage();
    }

    firstUpdated() {
        router.subscribe(() => this.requestUpdate());
        if (CONFIGURATION.isSecured && !HTTP_CLIENT.isAuthenticated()) {
            console.log('user not authenticated, redirect to login page.')
            router.navigate(CONFIGURATION.loginPage);
        }
    }

    abstract renderPage(): TemplateResult;


}