import {customElement, html, TemplateResult} from "lit-element";
import {AbstractApp} from "../abstract-app";
import {router} from "../router";
import {HomePage} from "../pages/homepage";
import {GetStartedPage} from "../pages/get-started";
import {MediaPage} from "../pages/media";
import {FormPage} from "../pages/form";
import {ComponentPage} from "../pages/component";
import {CompoundComponentPage} from "../pages/compound-component";
import {CheckPage} from "../pages/check";


@customElement('app-root')
export class AppComponent extends AbstractApp{


    renderPage(): TemplateResult {

        switch (router.getPath()) {
            case '':
                return html`${new HomePage()}`;
            case '#get-started':
                return html`${new GetStartedPage()}`;
            case '#media':
                return html`${new MediaPage()}`;
            case '#form':
                return html`${new FormPage()}`;
            case '#c':
                return html`${new ComponentPage()}`;
            case '#cc':
                return html`${new CompoundComponentPage()}`;
            case '#check':
                return html`${new CheckPage()}`;
            default:
                return html`Fehler - Keine Seite`;
        }
    }


}