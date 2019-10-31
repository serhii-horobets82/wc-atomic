import {css, customElement, html, property, query, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../abstract-component/component';
import {TextWithHeaderInputData} from "./model";
import {H1Component} from "../../atoms/h/component";
import {TextComponent} from "../../text/component";
import {HInputData} from "../../atoms/h/model";
import {TextInputData} from "../../text/model";

const componentCSS = require('./component.css');

@customElement('component-text-with-header')
export class TextWithHeaderComponent extends AbstractComponent<TextWithHeaderInputData, undefined> {
    static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

    static IDENTIFIER: string = 'TextWithHeaderComponent';

    @property()
    headerInputData: HInputData = <HInputData>{};

    @property()
    textInputData: TextInputData = <TextInputData>{};

    render() {
        return html`
        ${H1Component.createFromInputData(this.headerInputData)}
        <component-text .inputData="${this.textInputData}"></component-text>
         
      `;
    }

    getDefaultInputData(): TextWithHeaderInputData {
        return <TextWithHeaderInputData>{
            componentIdentifier: TextWithHeaderComponent.IDENTIFIER,
            headerInputData: new H1Component().getDefaultInputData(),
            textInputData: new TextComponent().getDefaultInputData()
        };
    }

    getOutputData(): any {
        return undefined;
    }

    protected inputDataChanged() {
        this.headerInputData = this.inputData.headerInputData;
        this.textInputData = this.inputData.textInputData;
    }

}
