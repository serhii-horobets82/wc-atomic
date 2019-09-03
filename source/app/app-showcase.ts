import {customElement, html, TemplateResult} from "lit-element";
import {AbstractApp} from "../abstract/app/component";
import {router} from "../util/router";
import {HomePage} from "./pages/homepage";
import {GetStartedPage} from "./pages/get-started";
import {MediaPage} from "./pages/media";
import {FormPage} from "./pages/form";
import {CheckPage} from "./pages/check";
import {AtomsPage} from "./pages/atoms";
import {MoleculesPage} from "./pages/molecules";
import {OrganismPage} from "./pages/organism";
import {LandingPage} from "../pages/landing-page/component";


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
            case "#molecules":
                let moleculesPage = new MoleculesPage();
                return html`${moleculesPage}`;
            case "#organism":
                let organismPage = new OrganismPage();
                return html`${organismPage}`;
            case '#media':
                let mediaPage = new MediaPage();
                return html`${mediaPage}`;
            case '#form':
                let formPage = new FormPage();
                return html`${formPage}`;
            case '#check':
                return html`${new CheckPage()}`;
            case '#landingPage':
                return html`${new LandingPage()}`;
            default:
                return html`Fehler - Keine Seite`;
        }
    }


}