import {NavigationComponent} from "../../atoms/navigation/component";
import {NavigationInputData} from "../../atoms/navigation/model";
import {HttpClient, HttpConfigImpl} from "../../util/http-client/http-client";
import {store} from "../../util/storage/storage";
import {DatalistOption} from "../../atoms/datalist/model";

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
        {text: 'Balance', href: '#balance', icon: ''},
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

window.onload = function () {
    let responsePromise = httpClient.get('/COMPANY');
    responsePromise.then(response => {
        let responseTextPromise = response.text();
        responseTextPromise.then(responseText => {
            let companies: Konzern[] = JSON.parse(responseText);
            let companyOptions: DatalistOption[] = [];
            companies.forEach(company => {
                companyOptions.push(<DatalistOption>{text: company.firmenname, value: company.idl + ''})
            });
            store.addData("companies", JSON.stringify(companyOptions));
        })
    })
}


export interface User {
    id: number;
    idl?: any;
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

function loadLoginData() {
    let responsePromise = httpClient.get('/SYSTEM/AUTH/USER_DETAILS');
    responsePromise.then(response => {
        let responseTextPromise = response.text();
        responseTextPromise.then(responseText => {
            let user: User = JSON.parse(responseText);
            store.addData("user", JSON.stringify(user));
        })
    })
}



