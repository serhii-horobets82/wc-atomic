import {NavigationComponent} from "../../atoms/navigation/component";
import {NavigationInputData} from "../../atoms/navigation/model";
import {HttpClient, HttpClientConfig} from "../../util/http-client";

export const httpClient: HttpClient = new HttpClient(<HttpClientConfig>{baseURL: 'http://localhost:8095'});

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
    ]
}