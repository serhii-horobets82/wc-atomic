import {LitElement, TemplateResult} from "lit-element";
import {router} from "../../util/router";
import {CONFIGURATION, HTTP_CLIENT} from "../../app/data/data";

export abstract class AbstractApp extends LitElement {

    constructor() {
        super();
    }

    render() {
        return this.renderPage();
    }

    firstUpdated() {
        this.registerEventListener();
        router.subscribe(() => this.requestUpdate());
        if (CONFIGURATION.isSecured && !HTTP_CLIENT.isAuthenticated()) {
            console.log('user not authenticated, redirect to login page.')
            router.navigate(CONFIGURATION.loginPage);
        }
    }

    abstract renderPage(): TemplateResult;

    /**
     *
     * Here you can register event listener on app root component,
     * so you can catch all underlying events.
     *
     */
    protected registerEventListener(): void {
    }




}