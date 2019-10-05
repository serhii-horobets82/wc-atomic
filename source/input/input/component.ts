import {css, customElement, html, property, query, unsafeCSS} from 'lit-element';
import {AbstractComponent} from "../../abstract/component/component";
import {InputDataChangeEvent, InputInputData} from "./model";
import {KeyValueData} from "../../organisms/form/model";
import {baseHelper} from "../../util/base";

const componentCSS = require('./component.css');


export enum HTMLInputTypes {
    BUTTON = 'button',
    CHECKBOX = 'checkbox',
    COLOR = 'color',
    DATE = 'date',
    DATETIME_LOCAL = 'datetime-local',
    EMAIL = 'email',
    FILE = 'file',
    HIDDEN = 'hidden',
    IMAGE = 'image',
    MONTH = 'month',
    NUMBER = 'number',
    PASSWORD = 'password',
    RADIO = 'radio',
    RANGE = 'range',
    RESET = 'reset',
    SEARCH = 'search',
    SUBMIT = 'submit',
    TEL = 'tel',
    TEXT = 'text',
    TIME = 'time',
    URL = 'url',
    WEEK = 'week'
}


@customElement('component-inputfield')
export class InputComponent extends AbstractComponent<InputInputData, KeyValueData> {

    static styles = css`${unsafeCSS(componentCSS)}`;

    static IDENTIFIER: string = 'TextfieldComponent';

    static EVENT_KEY_UP_CHANGE: string = 'component-inputfield-keyup';

    static EVENT_CHANGE: string = 'component-inputfield-change';

    @property()
    name: string = '';

    @property()
    value: string = '';

    @property()
    type: string = HTMLInputTypes.TEXT;

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

    getDefaultInputData(): InputInputData {
        return <InputInputData>{
            componentIdentifier: InputComponent.IDENTIFIER,
            name: 'textfield',
            text: 'name',
            value: '',
            placeholder: 'Gib einen Text ein'
        };
    }

    render() {
        return html`
            <input id="inputElement" multiple="" name="${this.name}" @keyup="${this.keyup}" @change="${(event: InputDataChangeEvent) => this.change(event)}" type="${this.type}" value="${this.value}" placeholder="${this.placeholder}" size="${this.size}" maxlength="${this.maxlength}" min="${this.min}" max="${this.max}"/>
`;
    }

    async keyup() {
        this.dispatchSimpleCustomEvent(InputComponent.EVENT_KEY_UP_CHANGE, this.getOutputData());
    }

    async change(event: Event) {
        let inputDataChangedEvent: InputDataChangeEvent = <InputDataChangeEvent>{};
        inputDataChangedEvent.type = this.type;
        inputDataChangedEvent.element = <HTMLInputElement>event.target;
        inputDataChangedEvent.outputData = this.getOutputData();
        this.dispatchSimpleCustomEvent(InputComponent.EVENT_CHANGE, inputDataChangedEvent);
    }

    getOutputData(): KeyValueData {
        return <KeyValueData>{
            key: this.name,
            value: this.textfieldElemet != null ? this.textfieldElemet.value : this.value,
        };
    }

    getEventList(): string[] {
        return [InputComponent.EVENT_KEY_UP_CHANGE, InputComponent.EVENT_CHANGE];
    }

    protected inputDataChanged() {
        this.name = baseHelper.getValue(this.inputData.name, '');
        this.value = baseHelper.getValue(this.inputData.value, '');
        this.type = baseHelper.getValue(this.inputData.value, HTMLInputTypes.TEXT);
        this.placeholder = baseHelper.getValue(this.inputData.value, '');
        this.maxlength = baseHelper.getValue(this.inputData.maxlength, this.maxlength);
        this.size = baseHelper.getValue(this.inputData.size, this.size);
        this.min = baseHelper.getValue(this.inputData.size, this.min);
        this.max = baseHelper.getValue(this.inputData.size, this.max);
    }

}
