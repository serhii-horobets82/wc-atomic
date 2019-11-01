import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from "../../abstract-component/component";
import {LinkInputData} from "./model";


const componentCSS = require('./component.css');

@customElement('component-link')
export class LinkComponent extends AbstractComponent<LinkInputData, undefined> {

    static styles = css`${unsafeCSS(componentCSS)}`;

    static IDENTIFIER: string = 'LinkComponent';

    @property()
    href: string = '';

    @property()
    text: string = '';

    render() {
        return html`<a href="${this.href}">${this.text}<slot></slot></a>`;
    }

    protected inputDataChanged() {
        this.href = this.basicService.getValue(this.inputData.href,'');
        this.text = this.basicService.getValue(this.inputData.text,'');
    }

    getDefaultInputData(): LinkInputData {
        return <LinkInputData>{componentIdentifier: LinkComponent.IDENTIFIER, text: 'Home', href: '/'};
    }

    getOutputData(): undefined {
        return undefined;
    }


}
