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
import {I18NInputData} from "../../molecules/i18n-selector/model";
import {I18NSelectorComponent} from "../../molecules/i18n-selector/component";
import {KeyValueData} from "../../organisms/form/model";
import {TableContent} from "../../organisms/table/model";
import {I18N, LanguageItem} from "../../util/i18n-util";
import {AuthenticatedIconInputData} from "../../molecules/authenticated-icon/model";

export const CONFIGURATION: AppData = <AppData>{
    isSecured: true,
    description: 'Balco Tool',
    name: 'Balco',
    loginPage: '#login',
};

//baseURL = 'http://v220190910399797452.supersrv.de:8095';
//baseURL = 'http://localhost:8095';
//baseURL: 'http://91.132.144.173:8095',
//baseURL: 'http://localhost:8095',

export const HTTP_CLIENT: HttpClient = new HttpClient(<HttpClientIF>{
    credentials: Credentials.INCLUDE,
    cors: CorsMode.CORS,
    defaultContentType: 'application/json',
    baseURL: 'http://v220190910399797452.supersrv.de:8095',
    isSecured: CONFIGURATION.isSecured,
    loginPath: '/dologin',
    logoutPath: '/dologout',
});

export interface Retification   {
    src_id: number;
    src_idl: string;
    src_nummer: string;
    src_bezeichnung: string;
    src_typ: string;
    src_saldo: number;
    dest_idl: string;
    dest_nummer: string;
    dest_bezeichnung: string;
    dest_typ: string;
    dest_saldo: number;
}

export interface BalanceOverview {
    typ: string;
    saldoSumme: number;
    anzahlImportierteSalden: number;
    anzahlZuBestaetigenderSalden: number;
    anzahlKontenInSaldenabstimmung: number;
    anzahlSaldenbestaetigungen: number;
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



