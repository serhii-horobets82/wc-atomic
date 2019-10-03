import {NavigationComponent} from "../../atoms/navigation/component";
import {NavigationInputData} from "../../atoms/navigation/model";
import {CorsMode, Credentials, HttpClient, HttpClientIF} from "../../util/http-client/http-client";
import {SessionStore} from "../../util/storage/storage";
import {AppData} from "../../abstract/app/app";


export const CONFIGURATION: AppData = <AppData>{
    isSecured: true,
    description: 'Balco Tool',
    name: 'Balco',
    loginPage: '#login',
};

//baseURL = 'http://v220190910399797452.supersrv.de:8095';
//baseURL = 'http://localhost:8095';

export const HTTP_CLIENT: HttpClient = new HttpClient(<HttpClientIF>{
    credentials: Credentials.INCLUDE,
    cors: CorsMode.CORS,
    defaultContentType: 'application/json',
    baseURL: 'http://91.132.144.173:8095',
    isSecured: CONFIGURATION.isSecured,
    loginPath: '/dologin',
    logoutPath: '/dologout',
});

export const SESSION_STORE = new SessionStore();

export const DATA_NAVIGATION: NavigationInputData = <NavigationInputData>{
    componentIdentifier: NavigationComponent.IDENTIFIER,
    links: [
        {text: 'Homepage', href: '#', icon: 'icon-home'},
        {text: 'Get started', href: '#get-started', icon: ''},
        {text: 'Atoms', href: '#atoms', icon: ''},
        {text: 'Molecules', href: '#molecules', icon: ''},
        {text: 'Organism', href: '#organism', icon: ''},
        {text: 'Login Page', href: '#login', icon: ''},
        {text: 'Register Page', href: '#register', icon: ''},
        {text: 'Startseite', href: '#dashboard', icon: ''},
        {text: 'Import', href: '#import', icon: ''},
        {text: 'IC-Salden', href: '#balance', icon: ''},
        {text: 'Kontenabstimmung', href: '#retification', icon: ''},
        {text: 'Saldenbestätigungen', href: '#matching', icon: ''},
    ]
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



