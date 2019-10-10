import {LitElement, TemplateResult} from "lit-element";
import {AppData} from "./app";
import {router, Router} from "../../util/router";
import {HttpClient} from "../../util/http-client/http-client";
import {I18nUtil} from "../../util/i18n-util";


export abstract class AbstractApp extends LitElement {

    private readonly _appData: AppData;

    protected readonly i18n: I18nUtil = new I18nUtil();

    constructor() {
        super();
        console.log('init appData...');
        this._appData = this.initAppData();
        console.log('app constructor done.');
    }

    /**
     * get all app data object
     */
    get appData(): AppData {
        return this._appData;
    }

    /**
     * get current app httpClient
     */
    get httpClient(): HttpClient {
        return this.appData.httpClient;
    }

    protected abstract initAppData(): AppData;

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
        router.subscribe(() => this.requestUpdate());
        if (this.appData.isSecured && !this.appData.httpClient.isAuthenticated()) {
            console.log('user not authenticated, redirect to login page.')
            router.navigate(this.appData.loginPage);
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