import {customElement, html, TemplateResult} from "lit-element";
import {AbstractApp} from "../abstract/abstract-app";
import {router} from "../util/router";
import {HomePage} from "./pages/homepage";
import {GetStartedPage} from "./pages/get-started";
import {MediaPage} from "./pages/media";
import {FormPage} from "./pages/form";
import {CheckPage} from "./pages/check";
import {AtomsPage} from "./pages/atoms";


@customElement('app-root')
export class ShowcaseApp extends AbstractApp {

    renderPage(): TemplateResult {
        switch (router.getPath()) {
            case '':
                let homePage = new HomePage();
                return html`${homePage}`;
            case '#get-started':
                let getStartedPage = new GetStartedPage();
                return html`${getStartedPage}`;
            case '#atoms':
                let atomsPage = new AtomsPage();
                return html`${atomsPage}`;
            case '#media':
                let mediaPage = new MediaPage();
                return html`${mediaPage}`;
            case '#form':
                let formPage = new FormPage();
                return html`${formPage}`;
            case '#check':
                return html`${new CheckPage()}`;
            default:
                return html`Fehler - Keine Seite`;
        }
    }


}