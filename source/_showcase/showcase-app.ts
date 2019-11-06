import {customElement, html, TemplateResult} from 'lit-element';
import {RouterService} from "@domoskanonos/frontend-basis";
import {Dashboard} from "./dashboard";
import {AbstractApp} from "../abstract-app/component";

@customElement('app-root')
class ShowcaseApp extends AbstractApp {

    renderPage(): TemplateResult {
        let path = RouterService.getInstance().getPath();
        console.log('current path: '.concat(path));
        switch (path) {
            case '#dashboard':
                return html`${new Dashboard()}`;
            case '':
            default:
                return html`Hallo Welt`;
        }
    }

}