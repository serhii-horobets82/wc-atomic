import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from "../../abstract/abstract-component";
import {Navigation, NavigationLink} from "../../interface/atoms";

const componentCSS = require('./component.css');

@customElement('component-navigation')
export class NavigationComponent extends AbstractComponent<Navigation, any> {

    @property()
    links: NavigationLink[];

    static styles = css`${unsafeCSS(componentCSS)}`;

    static IDENTIFIER: string = 'NavigationComponent';

    getDefaultInputData(): Navigation {
        return <Navigation>{
            componentIdentifier: NavigationComponent.IDENTIFIER,
            links: [
                {text: 'Homepage', href: '#', icon: 'icon-home'},
                {text: 'Get started', href: '#get-started', icon: ''},
                {text: 'Form', href: '#form', icon: ''},
                {text: 'Media', href: '#media', icon: ''},
                {text: 'Komponenten', href: '#c', icon: ''},
                {text: 'Komplexe Komponenten', href: '#cc', icon: ''},
                {text: 'Dynamische Komponenten', href: '#dc', icon: ''},
            ]
        }
    }

    render() {
        return html`<div>
      <nav>
        <ul>
            ${this.links.map((linkItem) => html`
                <li>
                    <component-icon iconClazz="${linkItem.icon}"></component-icon>
                    <component-link href="${linkItem.href}" text="${linkItem.text}"></component-link>
                </li>
            `)}
        </ul>
      </nav>
     </div>
    `;
    }

    protected inputDataChanged() {
        this.links = this.inputData.links;
    }

    getOutputData(): any {
        return undefined;
    }


}

