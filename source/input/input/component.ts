import {css, customElement, html, property, query, unsafeCSS} from 'lit-element';
import {AbstractComponent} from "../../abstract/component/component";
import {TextfieldInputData} from "./model";
import {KeyValueOutputData} from "../../organisms/form/model";

const componentCSS = require('./component.css');

@customElement('component-inputfield')
export class InputComponent extends AbstractComponent<TextfieldInputData, KeyValueOutputData> {

    static styles = css`${unsafeCSS(componentCSS)}`;

    static IDENTIFIER: string = 'TextfieldComponent';

    static EVENT_KEY_UP_CHANGE: string = 'component-inputfield-keyup';

    static EVENT_CHANGE: string = 'component-inputfield-change';

    @property()
    name: string = '';

    @property()
    value: string = '';

    @property()
    type: string = 'text';

    @property()
    placeholder: string = '';

    @property()
    maxlength: number = 255;

    @property()
    min: number = 0;

    @property()
    max: number = 255;

    @property()
    size: number = 50;

    @query("#inputElement")
    private textfieldElemet: HTMLInputElement | undefined;

    getDefaultInputData(): TextfieldInputData {
        return <TextfieldInputData>{
            componentIdentifier: InputComponent.IDENTIFIER,
            name: 'textfield',
            text: 'name',
            value: '',
            placeholder: 'Gib einen Text ein'
        };
    }

    render() {
        return html`
            <input id="inputElement" name="${this.name}" @keyup="${this.keyup}" @change="${this.change}" type="${this.type}" value="${this.value}" placeholder="${this.placeholder}" size="${this.size}" maxlength="${this.maxlength}" min="${this.min}" max="${this.max}"/>
`;
    }

    async keyup() {
        this.value = this.textfieldElemet != null ? this.textfieldElemet.value : this.value;
        this.dispatchSimpleCustomEvent(InputComponent.EVENT_KEY_UP_CHANGE, this.getOutputData());
    }

    async change() {
        this.value = this.textfieldElemet != null ? this.textfieldElemet.value : this.value;
        this.dispatchSimpleCustomEvent(InputComponent.EVENT_CHANGE, this.getOutputData());
    }

    getOutputData(): KeyValueOutputData {
        return <KeyValueOutputData>{
            key: this.name,
            value: this.value,
        };
    }

    getEventList(): string[] {
        return [InputComponent.EVENT_KEY_UP_CHANGE, InputComponent.EVENT_CHANGE];
    }

    protected inputDataChanged() {
        this.name = this.inputData.name;
        this.value = this.inputData.value !== undefined ? this.inputData.value : '';
        this.placeholder = this.inputData.placeholder !== undefined ? this.inputData.placeholder : '';
        this.maxlength = this.inputData.maxlength !== undefined ? this.inputData.maxlength : 255;
        this.size = this.inputData.size !== undefined ? this.inputData.size : 20;
        this.type = this.inputData.type !== undefined ? this.inputData.type : 'text';

    }

}
