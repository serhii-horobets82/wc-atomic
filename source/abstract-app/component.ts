import {TemplateResult} from "lit-element";
import {HttpClientService, RouterService} from "@domoskanonos/frontend-basis";
import {AbstractComponent, AbstractInputData} from "../index";

export class AppData extends AbstractInputData {
    name?: string;
    description?: string;
    isSecured?: boolean;
    loginPage?: string;
    httpClient?: HttpClientService;
    router?: RouterService;
}

export abstract class AbstractApp extends AbstractComponent<AppData, undefined> {

    /**
     * doing stuff before first rendering, f.e. load data from server
     */
    protected async preRender(): Promise<void> {
        return Promise.resolve();
    }

    render() {
        return this.renderPage();
    }

    firstUpdated() {
        this.registerEventListener();
        RouterService.getInstance().subscribe(() => this.requestUpdate());
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

    getDefaultInputData(): AppData {
        return <AppData>{};
    }


    getOutputData(): undefined {
        return undefined;
    }

    protected inputDataChanged(): void {
    }

}
