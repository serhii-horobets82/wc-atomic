
import {Navigation} from "../../interface/atoms";
import {NavigationComponent} from "../../atoms/navigation/component";

export const data_navigation:Navigation = <Navigation> {
    componentIdentifier: NavigationComponent.IDENTIFIER,
    links: [
        {text: 'Homepage', href: '#', icon: 'icon-home'},
        {text: 'Get started', href: '#get-started', icon: ''},
        {text: 'Form', href: '#form', icon: ''},
        {text: 'Atoms', href: '#atoms', icon: ''},
        {text: 'Komponenten', href: '#c', icon: ''},
        {text: 'Komplexe Komponenten', href: '#cc', icon: ''},
        {text: 'Dynamische Komponenten', href: '#dc', icon: ''},
    ]
}