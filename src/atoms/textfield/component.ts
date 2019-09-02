import {css, customElement, html, property, query, unsafeCSS} from 'lit-element';
import {AbstractComponent} from "../../abstract/abstract-component";
import {KeyValueOutputData} from "../../organisms/form/container/organism";
import {Textfield} from "../../interface/atoms";

const componentCSS = require('./component.css');

@customElement('component-textfield')
export class TextfieldComponent extends AbstractComponent<Textfield, KeyValueOutputData> {

    static styles = css`${unsafeCSS(componentCSS)}`;

    static IDENTIFIER: string = 'TextfieldComponent';

    static EVENT_KEY_UP_CHANGE: string = 'component-textfield-keyup';

    @property()
    name: string = '';

    @property()
    value: string = '';

    @property()
    placeholder: string = '';

    @property()
    maxlength: number = 255;

    @property()
    size: number = 50;

    @query("#textfieldElement")
    private textfieldElemet: HTMLInputElement;

    getDefaultInputData(): Textfield {
        return <Textfield>{
            componentIdentifier: TextfieldComponent.IDENTIFIER,
            name: 'textfield',
            text: 'name',
            value: '',
            placeholder: 'Gib einen Text ein'
        };
    }

    render() {
        return html`
            <input id="textfieldElement" name="${this.name}" @keyup="${this.keyup}" type="text" value="${this.value}" placeholder="${this.placeholder}" size="${this.size}" maxlength="${this.maxlength}" />
`;
    }

    async keyup(event: Event) {
        this.dispatchSimpleCustomEvent(TextfieldComponent.EVENT_KEY_UP_CHANGE);
    }

    getOutputData(): KeyValueOutputData {
        let value = this.textfieldElemet != null ? this.textfieldElemet.value : this.value;
        return <KeyValueOutputData>{
            key: this.name,
            value: value,
        };
    }

    getEventList(): string[] {
        return [TextfieldComponent.EVENT_KEY_UP_CHANGE];
    }

    protected inputDataChanged() {
        this.name = this.inputData.name;
        this.value = this.inputData.value !== undefined ? this.inputData.value : '';
        this.placeholder = this.inputData.placeholder !== undefined ? this.inputData.placeholder : '';
        this.maxlength = this.inputData.maxlength !== undefined ? this.inputData.maxlength : 255;
        this.size = this.inputData.size !== undefined ? this.inputData.size : 20;
    }

}
