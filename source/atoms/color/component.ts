import {css, customElement, html, property, query, unsafeCSS} from 'lit-element';
import {AbstractComponent} from "../../abstract/abstract-component";
import {KeyValueOutputData} from "../../organisms/form/component";
import {AbstractInputData} from "../../interface/atoms";

const componentCSS = require('./component.css');

export interface Component extends AbstractInputData {
    name: string;
    color: string;
}


@customElement('component-color')
export class ColorComponent extends AbstractComponent<Component, KeyValueOutputData> {

    static styles = css`${unsafeCSS(componentCSS)}`;

    static IDENTIFIER: string = 'ColorComponent';

    static EVENT_VALUE_CHANGE: string = 'component-color-value-change';

    @property()
    name: string;

    @property()
    color: string;

    @query('#colorElement')
    private colorElement: HTMLInputElement;

    render() {
        return html`
            <input id="colorElement" @change="${this.valueChange}" type="color" name="${this.name}" value="${this.color}"/>
`;
    }

    async valueChange(event: Event) {
        this.dispatchSimpleCustomEvent(ColorComponent.EVENT_VALUE_CHANGE);
    }

    getDefaultInputData(): Component {
        return <Component>{
            componentIdentifier: ColorComponent.IDENTIFIER,
            name: 'name',
            color: '#000000',
        };
    }

    getOutputData(): KeyValueOutputData {
        let value = this.colorElement != null ? this.colorElement.value : this.color;
        return <KeyValueOutputData>{
            key: this.name,
            value: value,
        };
    }


    protected inputDataChanged() {
        this.name = this.inputData.name;
        this.color = this.inputData.color;
    }

    getEventList(): string[] {
        return [ColorComponent.EVENT_VALUE_CHANGE];
    }

}
