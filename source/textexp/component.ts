import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {TextInputData} from "./model";
import {AbstractComponent} from "../abstract/component/component";

const componentCSS = require('./component.css');

@customElement('component-texte')
export class TextEComponent extends AbstractComponent<any, any> {
    static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

    static IDENTIFIER: string = 'TextComponent';

    @property()
    text: string = '';

    @property()
    title: string = '';

    @property()
    clazz: string = '';

    @property()
    cssStyle: string = '';

    render() {
        return html`
         <span class="text ${this.clazz}" title="${this.title}" style="${this.cssStyle}"
            >${this.text}<slot></slot></span
         >
      `;
    }

    getDefaultInputData(): TextInputData {
        return <TextInputData>{
            componentIdentifier: TextEComponent.IDENTIFIER,
            text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
        };
    }

    getOutputData(): any {
        return undefined;
    }

    protected inputDataChanged() {
    }
}
