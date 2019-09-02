import {css, customElement, html, property, query, unsafeCSS} from 'lit-element';
import {AbstractComponent} from "../../abstract/abstract-component";
import {KeyValueOutputData} from "../../organisms/form/container/organism";
import {Textarea} from "../../interface/atoms";

const componentCSS = require('./component.css');


@customElement('component-textarea')
export class TextareaComponent extends AbstractComponent<Textarea, KeyValueOutputData> {

    static styles = css`${unsafeCSS(componentCSS)}`;

    static IDENTIFIER: string = 'TextareaComponent';

    static EVENT_KEY_UP_CHANGE: string = 'component-textarea-keyup';

    @property()
    name: string;

    @property()
    value: string;

    @property()
    rows: number;

    @query('#textareaElement')
    private textareaElement: HTMLTextAreaElement;

    getDefaultInputData(): Textarea {
        return <Textarea>{
            componentIdentifier: TextareaComponent.IDENTIFIER,
            name: 'textarea',
        };
    }

    async keyup(event: Event) {
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

    getOutputData(): KeyValueOutputData {
        let value = this.textareaElement != null ? this.textareaElement.value : this.value;
        return <KeyValueOutputData>{
            key: this.name,
            value: value,
        };
    }


    getEventList(): string[] {
        return [TextareaComponent.EVENT_KEY_UP_CHANGE];
    }

}
