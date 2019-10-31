import {AbstractApp} from "../abstract/app/component";
import {DashboardPage} from "./pages/dashboard";
import {APP_DATA, I18N} from "../index";
import {HttpStatusEnum} from "@domoskanonos/frontend-basis";
import {customElement, html, TemplateResult} from "lit-element";
import {InputComponent} from "../input/input/component";
import {ButtonComponent} from "../atoms/button/component";

@customElement('app-root')
export class ShowcaseApp extends AbstractApp {

    protected async preRender() {
        let response = await APP_DATA.httpClient.get('/I18N/JSON/' + I18N.getLanguage());
        if (response.status == HttpStatusEnum.OK) {
            I18N.saveData(JSON.parse(await response.text()));
            return Promise.resolve();
        } else {
            return Promise.reject(response.status);
        }
    }

    renderPage(): TemplateResult {

        let dd : DashboardPage = new DashboardPage();

        switch (APP_DATA.router.getPath()) {
            case '':
            case '#dashboard':
                return html`${new DashboardPage()}`;
            default:
                return html`Fehler - Keine Seite`;
        }
    }


}