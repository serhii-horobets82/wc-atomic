import {LitElement, TemplateResult} from "lit-element";
import {APP_DATA} from "../../index";


export abstract class AbstractApp extends LitElement {

    constructor() {
        super();
    }

    /**
     * doing stuff before first rendering, f.e. load data from server
     */
    protected async preRender() {
        return Promise.resolve();
    }

    render() {
        return this.renderPage();
    }

    firstUpdated() {
        this.registerEventListener();
        APP_DATA.router.subscribe(() => this.requestUpdate());
        if (APP_DATA.isSecured && !APP_DATA.httpClient.isAuthenticated()) {
            console.log('user not authenticated, redirect to login page.')
            APP_DATA.router.navigate(APP_DATA.loginPage);
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