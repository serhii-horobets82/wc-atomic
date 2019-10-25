import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from "../../abstract/component/component";
import {SpacerInputData} from "./model";
import {baseHelper} from "../../index";

const componentCSS = require('./component.css');

@customElement('component-spacer')
export class SpacerComponent extends AbstractComponent<SpacerInputData, undefined> {

    static styles = css`${unsafeCSS(componentCSS)}`;

    static IDENTIFIER: string = 'SpacerComponent';

    @property()
    clazz: string = '';

    render() {
        return html`<div class="${this.clazz}"><slot></slot></div>`;
    }

    getDefaultInputData(): any {
        return <SpacerInputData>{clazz: ''};
    }

    getOutputData(): undefined {
        return undefined;
    }

    protected inputDataChanged() {
        this.clazz = baseHelper.getValue(this.inputData.clazz, '');
    }

}
