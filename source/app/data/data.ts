import {NavigationComponent} from "../../atoms/navigation/component";
import {NavigationInputData} from "../../atoms/navigation/model";
import {HttpClient, HttpConfigImpl} from "../../util/http-client/http-client";
import {sessionStore} from "../../util/storage/storage";
import {DatalistOption} from "../../input/datalist/model";

export const httpClient: HttpClient = new HttpClient(new HttpConfigImpl());

export const data_navigation: NavigationInputData = <NavigationInputData>{
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
        {text: 'Balance', href: '#balance', icon: ''},
        {text: 'Matching', href: '#matching', icon: ''},
        {text: 'Retification', href: '#retification', icon: ''},
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



