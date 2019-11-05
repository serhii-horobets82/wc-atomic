import {css, customElement, html, property, query, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from "../abstract-component/component";
import {KeyValueData} from "../form/component";

const componentCSS = require('./component.css');


export class TextareaInputData extends AbstractInputData {
    name: string = '';
    value: string = '';
    rows?: number;
}

@customElement('component-textarea')
export class TextareaComponent extends AbstractComponent<TextareaInputData, KeyValueData> {

    static styles = css`${unsafeCSS(componentCSS)}`;

    static IDENTIFIER: string = 'TextareaComponent';

    static EVENT_KEY_UP_CHANGE: string = 'component-textarea-keyup';

    @property()
    name: string = '';

    @property()
    value: string = '';

    @property()
    rows: number = 0;

    @query('#textareaElement')
    private textareaElement: HTMLTextAreaElement | undefined;

    getDefaultInputData(): TextareaInputData {
        return <TextareaInputData>{
            componentIdentifier: TextareaComponent.IDENTIFIER,
            name: 'textarea',
        };
    }

    async keyup() {
        this.dispatchSimpleCustomEvent(TextareaComponent.EVENT_KEY_UP_CHANGE);
    }

    protected inputDataChanged() {
        this.name = this.inputData.name;
        this.value = this.inputData.value;
        this.rows = this.inputData.rows !== undefined ? this.inputData.rows : 10;
    }

    render() {
        return html`
            <textarea id="textareaElement" name="${this.name}" @keyup="${this.keyup}" rows="${this.rows}">${this.value}</textarea>
`;
    }

    getOutputData(): KeyValueData {
        let value = this.textareaElement != null ? this.textareaElement.value : this.value;
        return <KeyValueData>{
            key: this.name,
            value: value,
        };
    }


    getEventList(): string[] {
        return [TextareaComponent.EVENT_KEY_UP_CHANGE];
    }

}
