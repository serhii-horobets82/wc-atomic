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
import {BalancePage} from "./pages/balance";
import {DashboardPage} from "./pages/dashboard";
import {MatchingPage} from "./pages/matching";
import {RetificationPage} from "./pages/retification";
import {ImportPage} from "./pages/import";
import {AuthenticationPage} from "./pages/authentication";
import {BALCO_DATA_STORE} from "./data/balco_data";
import {KeyValueData} from "../organisms/form/model";


@customElement('app-root')
export class ShowcaseApp extends AbstractApp {

    protected registerEventListener(): void {
        super.registerEventListener();
        window.addEventListener('combobox-component-selection-change', (event) => {
                if (event instanceof CustomEvent) {
                    let customEvent: CustomEvent = event;
                    let data: KeyValueData = customEvent.detail;
                    if(data.key == 'myCompanies')
                        BALCO_DATA_STORE.setSelectedIDL(data.value);
                }
            }
        );
    }

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
            case '#login':
                return html`${new AuthenticationPage()}`;
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