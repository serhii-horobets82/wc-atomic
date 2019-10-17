import {customElement, html, TemplateResult} from "lit-element";
import {AbstractApp} from "../abstract/app/component";
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
import {KeyValueData} from "../organisms/form/model";
import {AppData} from "../abstract/app/app";
import {CorsMode, Credentials, HttpClient, HttpClientIF, HttpStatusEnum} from "../util/http-client/http-client";
import {BALCO_DATA_STORE, BalcoDataChannels} from "./data/balco_data";
import {router, Router} from "../util/router";
import {I18N} from "../util/i18n-util";
import {NavigationInputData} from "../atoms/navigation/model";
import {NavigationComponent} from "../atoms/navigation/component";
import {DefaultTemplateModel} from "../templates/default/model";
import {DefaultTemplate} from "../templates/default/template";
import {ToolbarInputData} from "../organisms/toolbar/model";
import {ToolbarComponent} from "../organisms/toolbar/component";
import {SpacerInputData} from "../atoms/spacer/model";
import {SpacerComponent} from "../atoms/spacer/component";
import {IconInputData} from "../atoms/icon/model";
import {IconComponent} from "../atoms/icon/component";
import {TextInputData} from "../atoms/text/model";
import {TextComponent} from "../atoms/text/component";
import {I18NInputData} from "../molecules/i18n-selector/model";
import {I18NSelectorComponent} from "../molecules/i18n-selector/component";
import {AuthenticatedIconInputData} from "../molecules/authenticated-icon/model";
import {AuthenticatedIconComponent} from "../molecules/authenticated-icon/component";
import {UI_REFRESHER} from "../util/ui-refresher/ui-rfresher";

export function getNAV(): NavigationInputData {
    return <NavigationInputData>{
        componentIdentifier: NavigationComponent.IDENTIFIER,
        contentBefore: [<TextInputData>{
            componentIdentifier: TextComponent.IDENTIFIER,
            text: I18N.getValue('balco_company')
        }, BALCO_DATA_STORE.getMyCompaniesCID(), <SpacerInputData>{
            componentIdentifier: SpacerComponent.IDENTIFIER,
            clazz: 'mediumPaddingTop'
        }, <I18NInputData>{
            componentIdentifier: I18NSelectorComponent.IDENTIFIER,
            languages: [<KeyValueData>{key: 'de-DE', value: 'Deutsch'}, <KeyValueData>{key: 'en-EN', value: 'English'}]
        }],
        links: [
            {text: I18N.getValue('balco_dashboard_page'), href: '#dashboard', icon: ''},
            {text: I18N.getValue('balco_import_page'), href: '#import', icon: ''},
            {text: I18N.getValue('balco_balance_page'), href: '#balance', icon: ''},
            {text: I18N.getValue('balco_retification_page'), href: '#retification', icon: ''},
            {text: I18N.getValue('balco_matching_page'), href: '#matching', icon: ''},
        ],
    };
}


export const DEFAULT_TEMPLATE_INPUT_DATA: DefaultTemplateModel = <DefaultTemplateModel>{
    componentIdentifier: DefaultTemplate.IDENTIFIER,
    dataReceiverChannels: [BalcoDataChannels.SELECTED_COMPANY],
    navigationInputData: getNAV(),
    toolbarInputData: <ToolbarInputData>{
        componentIdentifier: ToolbarComponent.IDENTIFIER,
        leftInputData: [<SpacerInputData>{
            componentIdentifier: SpacerComponent.IDENTIFIER,
            clazz: 'mediumPaddingLeft'
        }, <IconInputData>{componentIdentifier: IconComponent.IDENTIFIER, iconClazz: 'fas fa-bars', clickable: true}],
        mainInputData: [],
        rightInputData: [<AuthenticatedIconInputData>{
            componentIdentifier: AuthenticatedIconComponent.IDENTIFIER,
            isAuthenticated: false,
            loginPage: '#login',
            logoutPage: '#login'
        }, <SpacerInputData>{
            componentIdentifier: SpacerComponent.IDENTIFIER,
            clazz: 'mediumPaddingRight'
        }]
    },
    title: 'Component Overview',
    componentInputData: [],
}


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
                        BALCO_DATA_STORE.loadBalanceData().then(() => {
                            console.log("balance data neu geladen");
                            UI_REFRESHER.informListener(BalcoDataChannels.BALANCE_OVERVIEW_D)
                        });
                }
            }
        );
    }

//baseURL = 'http://v220190910399797452.supersrv.de:8095';
//baseURL = 'http://localhost:8095';
//baseURL: 'http://91.132.144.173:8095',
//baseURL: 'http://localhost:8095',

    protected initAppData(): AppData {
        console.log('init app data');
        let secured = true;
        return <AppData>{
            isSecured: secured,
            description: 'Balco Tool',
            name: 'Balco',
            loginPage: '#login',
            httpClient: new HttpClient(<HttpClientIF>{
                credentials: Credentials.INCLUDE,
                cors: CorsMode.CORS,
                defaultContentType: 'application/json',
                baseURL: 'http://v220190910399797452.supersrv.de:8095',
                isSecured: secured,
                loginPath: '/dologin',
                logoutPath: '/dologout',
            }),
            router: new Router(),
        };
    }

    protected async preRender() {
        let response = await this.appData.httpClient.get('/I18N/JSON/' + I18N.getLanguage());
        if (response.status == HttpStatusEnum.OK) {
            I18N.saveI18NData(JSON.parse(await response.text()));
            return Promise.resolve();
        } else {
            return Promise.reject(response.status);
        }
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