import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from '../abstract-component/component';
import {H1Component, HInputData} from "../h/component";
import {TextComponent, TextInputData} from "../text/component";

const componentCSS = require('./component.css');

export class TextWithHeaderInputData extends AbstractInputData {
    headerInputData?: HInputData;
    textInputData?: TextInputData;
}

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
        this.headerInputData = this.basicService.getValue(this.inputData.headerInputData, new HInputData());
        this.textInputData = this.basicService.getValue(this.inputData.textInputData, new TextInputData());
    }

}
