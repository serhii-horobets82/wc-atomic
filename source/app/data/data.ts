import {NavigationComponent} from "../../atoms/navigation/component";
import {NavigationInputData} from "../../atoms/navigation/model";
import {CorsMode, Credentials, HttpClient, HttpClientIF} from "../../util/http-client/http-client";
import {AppData} from "../../abstract/app/app";
import {DefaultTemplateModel} from "../../templates/default/model";
import {DefaultTemplate} from "../../templates/default/template";
import {ToolbarInputData} from "../../organisms/toolbar/model";
import {IconComponent} from "../../atoms/icon/component";
import {AuthenticatedIconComponent} from "../../molecules/authenticated-icon/component";
import {ToolbarComponent} from "../../organisms/toolbar/component";
import {IconInputData} from "../../atoms/icon/model";
import {BALCO_DATA_STORE, BalcoDataChannels} from "./balco_data";
import {SpacerInputData} from "../../atoms/spacer/model";
import {SpacerComponent} from "../../atoms/spacer/component";
import {TextInputData} from "../../atoms/text/model";
import {TextComponent} from "../../atoms/text/component";
import {I18NInputData} from "../../molecules/i18n/model";
import {I18NSelectorComponent} from "../../molecules/i18n/component";
import {KeyValueData} from "../../organisms/form/model";


export const CONFIGURATION: AppData = <AppData>{
    isSecured: true,
    description: 'Balco Tool',
    name: 'Balco',
    loginPage: '#login',
};

//baseURL = 'http://v220190910399797452.supersrv.de:8095';
//baseURL = 'http://localhost:8095';
//baseURL: 'http://91.132.144.173:8095',

export const HTTP_CLIENT: HttpClient = new HttpClient(<HttpClientIF>{
    credentials: Credentials.INCLUDE,
    cors: CorsMode.CORS,
    defaultContentType: 'application/json',
    baseURL: 'http://localhost:8095',
    isSecured: CONFIGURATION.isSecured,
    loginPath: '/dologin',
    logoutPath: '/dologout',
});

export const DATA_NAVIGATION: NavigationInputData = <NavigationInputData>{
    componentIdentifier: NavigationComponent.IDENTIFIER,
    links: [
        {text: 'Startseite', href: '#dashboard', icon: ''},
        {text: 'Import', href: '#import', icon: ''},
        {text: 'IC-Salden', href: '#balance', icon: ''},
        {text: 'Kontenabstimmung', href: '#retification', icon: ''},
        {text: 'Saldenbestätigungen', href: '#matching', icon: ''},
    ]
}


export const DEFAULT_TEMPLATE_INPUT_DATA: DefaultTemplateModel = <DefaultTemplateModel>{
    componentIdentifier: DefaultTemplate.IDENTIFIER,
    sessionStorageChannels: [BalcoDataChannels.SELECTED_COMPANY],
    navigationInputData: DATA_NAVIGATION,
    toolbarInputData: <ToolbarInputData>{
        componentIdentifier: ToolbarComponent.IDENTIFIER,
        leftInputData: [<SpacerInputData>{
            componentIdentifier: SpacerComponent.IDENTIFIER,
            clazz: 'mediumPaddingLeft'
        }, <IconInputData>{componentIdentifier: IconComponent.IDENTIFIER, iconClazz: 'fas fa-bars', clickable: true}],
        mainInputData: [],
        rightInputData: [BALCO_DATA_STORE.getMyCompaniesCID(), <SpacerInputData>{
            componentIdentifier: SpacerComponent.IDENTIFIER,
            clazz: 'mediumPaddingRight'
        }, <TextInputData>{
            componentIdentifier: TextComponent.IDENTIFIER,
            text: BALCO_DATA_STORE.getUserString()
        }, <SpacerInputData>{
            componentIdentifier: SpacerComponent.IDENTIFIER,
            clazz: 'mediumPaddingRight'
        }, <I18NInputData>{
            componentIdentifier: I18NSelectorComponent.IDENTIFIER,
            languages: [<KeyValueData>{key: 'de-DE', value: 'Deutsch'}, <KeyValueData>{key: 'en-EN', value: 'English'}]
        }, new AuthenticatedIconComponent().getDefaultInputData(), <SpacerInputData>{
            componentIdentifier: SpacerComponent.IDENTIFIER,
            clazz: 'mediumPaddingRight'
        }]
    },
    title: 'Component Overview',
    componentInputData: [],
}





export interface Konzern {
    id: number;
    teilkonzern: string;
    idl: string;
    anteilsbesitz: string;
    firmenname: string;
    beteiligungsart: string;
    konsolidierungsart: string;
}


export interface User {
    id: number;
    gender: string;
    name: string;
    vorname: string;
    telefon: string;
    fax: string;
    email: string;
    roleEnums: string[];
    position: string;
    abteilung: string;
    password: string;
    birthday?: any;
    active: boolean;
    city?: any;
    companyDTOS: Konzern[];
}



