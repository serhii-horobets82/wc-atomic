import {css, customElement, html, property, query, unsafeCSS} from 'lit-element';
import {guard} from 'lit-html/directives/guard';
import {repeat} from 'lit-html/directives/repeat';
import {AbstractComponent} from "../../abstract/abstract-component";
import {KeyValueOutputData} from "../../organisms/form/container/organism";
import {ComboboxInputData, ComboboxOption} from "./model";

const componentCSS = require('./combobox.css');

@customElement('component-combobox')
export class ComboboxComponent extends AbstractComponent<ComboboxInputData, KeyValueOutputData> {

    static styles = css`${unsafeCSS(componentCSS)}`;

    static IDENTIFIER: string = 'ComboboxComponent';

    static EVENT_SELECTION_CHANGE: string = 'combobox-component-selection-change';

    @property()
    name: string;

    @property()
    size: number;

    @property()
    options: ComboboxOption[];

    @query('#selectElement')
    private selectElement: HTMLSelectElement;

    protected inputDataChanged() {
        this.name = this.inputData.name;
        this.size = this.inputData.size;
        this.options = this.inputData.options;
    }

    render() {
        return html`
            <select id="selectElement" name="${this.name}" size="${this.size}" @change="${this.selectionChange}">
                ${guard([this.options], () => html`${
            repeat(this.options, option => option.value, (option, index) => html`
                        <option value="${option.value}">${option.text}</option>
                    `)}
                `)}
            </select>
        `;
    }

    async selectionChange(event: Event) {
        this.dispatchSimpleCustomEvent(ComboboxComponent.EVENT_SELECTION_CHANGE, this.getOutputData());
    }

    getOutputData(): KeyValueOutputData {
        let value = this.selectElement != null ? this.selectElement.value : '';
        return <KeyValueOutputData>{
            key: this.name,
            value: value,
        };
    }

    getDefaultInputData(): ComboboxInputData {
        return <ComboboxInputData>{
            componentIdentifier:ComboboxComponent.IDENTIFIER,
            name: 'combobox',
            size: 1,
            options: <ComboboxOption[]>[{value: 'value1', text: 'Eintrag 1'}, {
                value: 'value2',
                text: 'Eintrag 2'
            }, {value: 'value3', text: 'Eintrag 3'},],
        };
    }

    getEventList(): string[] {
        return [ComboboxComponent.EVENT_SELECTION_CHANGE];
    }

}