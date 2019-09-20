import {NavigationComponent} from "../../atoms/navigation/component";
import {NavigationInputData} from "../../atoms/navigation/model";
import {HttpClient, HttpClientIF, HttpConfigImpl} from "../../util/http-client/http-client";

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
    ]
}