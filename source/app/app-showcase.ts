import {customElement, html, TemplateResult} from "lit-element";
import {AbstractApp} from "../abstract/app/component";
import {router} from "../util/router";
import {HomePage} from "./pages/homepage";
import {GetStartedPage} from "./pages/get-started";
import {MediaPage} from "./pages/media";
import {CheckPage} from "./pages/check";
import {AtomsPage} from "./pages/atoms";
import {MoleculesPage} from "./pages/molecules";
import {OrganismPage} from "./pages/organism";
import {LandingPage} from "../pages/landing/component";
import {LoginPage} from "../pages/login/component";
import {RegisterPage} from "../pages/register/component";
import {BalancePage} from "./pages/balance";
import {DashboardPage} from "./pages/dashboard";
import {MatchingPage} from "./pages/matching";
import {RetificationPage} from "./pages/retification";
import {ImportPage} from "./pages/import";


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
            case '#check':
                return html`${new CheckPage()}`;
            case '#landingPage':
                return html`${new LandingPage()}`;
            case '#login':
                return html`${new LoginPage()}`;
            case '#register':
                return html`${new RegisterPage()}`;
            case '#dashboard':
                return html`${new DashboardPage()}`;
            case '#import':
                return html`${new ImportPage()}`;
            case '#balance':
                return html`${new BalancePage()}`;
            case '#matching':
                return html`${new MatchingPage()}`;
            case '#retification':
                return html`${new RetificationPage()}`;

            default:
                return html`Fehler - Keine Seite`;
        }
    }


}