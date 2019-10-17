import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from "../../abstract/component/component";
import {NavigationInputData, NavigationLinkInputData} from "./model";
import {AbstractInputData} from "../../abstract/component/model";
import {guard} from 'lit-html/directives/guard';
import {ComponentLoader} from "../../abstract/component-loader";
import {repeat} from 'lit-html/directives/repeat';
import {baseHelper} from "../../util/base";

const componentCSS = require('./component.css');

@customElement('component-navigation')
export class NavigationComponent extends AbstractComponent<NavigationInputData, any> {

    @property()
    links: NavigationLinkInputData[] = [];

    @property()
    contentBefore: AbstractInputData[] = [];

    @property()
    contentAfter: AbstractInputData[] = [];

    static styles = css`${unsafeCSS(componentCSS)}`;

    static IDENTIFIER: string = 'NavigationComponent';

    getDefaultInputData(): NavigationInputData {
        return <NavigationInputData>{
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
${guard(
            this.contentBefore,
            () =>
                html`
                           ${repeat(
                    this.contentBefore,
                    (inputData) => html`
                                 ${ComponentLoader.INSTANCE.createComponentFromInputData(
                        inputData
                    )}
                              `
                )}
                        `
        )}
                  <slot name="contentBefore"></slot>
                  
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
      
      ${guard(
            this.contentAfter,
            () =>
                html`
                           ${repeat(
                    this.contentAfter,
                    (inputData) => html`
                                 ${ComponentLoader.INSTANCE.createComponentFromInputData(
                        inputData
                    )}
                              `
                )}
                        `
        )}
                  <slot name="contentAfter"></slot>
      
     </div>
    `;
    }

    protected inputDataChanged() {
        this.links = this.inputData.links;
        this.contentBefore = baseHelper.getValue(this.inputData.contentBefore, []);
        this.contentAfter = baseHelper.getValue(this.inputData.contentAfter, []);
    }

    getOutputData(): any {
        return undefined;
    }


}

