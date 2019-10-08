import {css, customElement, html, property, query, unsafeCSS} from 'lit-element';
import {guard} from 'lit-html/directives/guard';
import {repeat} from 'lit-html/directives/repeat';
import {AbstractComponent} from "../../abstract/component/component";
import {DatalistInputData, DatalistOption} from "./model";
import {KeyValueData} from "../../organisms/form/model";
import {baseHelper} from "../../util/base";

const componentCSS = require('./component.css');

@customElement('component-datalist')
export class DatalistComponent extends AbstractComponent<DatalistInputData, KeyValueData> {

    static styles = css`${unsafeCSS(componentCSS)}`;

    static IDENTIFIER: string = 'DatalistComponent';

    static EVENT_SELECTION_CHANGE: string = 'combobox-datalist-selection-change';

    @property()
    name: string = '';

    @property()
    size: number = 1;

    @property()
    options: DatalistOption[] = [];

    @property()
    selectedValue: string | undefined;

    @property()
    selectedText: string = '';

    protected inputDataChanged() {
        this.name = this.inputData.name;
        this.size = this.inputData.size;
        if (this.inputData.options != undefined) {
            this.options = this.inputData.options;
        }
        this.selectedValue = this.inputData.selectedValue;
        this.updateSelectedText();
    }

    render() {
        return html`
           <input list="options" value="${this.selectedText}" @change="${(event: Event) => this.onChange(event)}">
           <input type="hidden" name="${this.name}" value="${this.selectedValue}"/>
            <datalist id="options" size="${this.size}">
                ${guard([this.options], () => html`${
            repeat(this.options, option => option.value, (option) => baseHelper.isEqual(this.selectedValue, option.value) ? html`
                        <option value="${option.value}" selected>${option.text}</option>
                    ` : html`
                        <option value="${option.value}">${option.text}</option>
                    `)}
                `)}
            </datalist>
        `;
    }

    private selectionChangesd(event: Event) {
        let selectElement: HTMLSelectElement | null = <HTMLSelectElement>event.target;
        this.selectedValue = selectElement != null ? selectElement.value : '';
        this.inputData.selectedValue = this.selectedValue;
        this.dispatchSimpleCustomEvent(DatalistComponent.EVENT_SELECTION_CHANGE, this.getOutputData());
    }

    async onChange(event: Event) {
        let inputElement: HTMLInputElement = <HTMLInputElement>event.target;
        this.selectedValue = inputElement.value;
        this.inputData.selectedValue = this.selectedValue;
        this.updateSelectedText();
        inputElement.value = this.selectedText;
        console.log('selected value change, new value: '.concat(this.selectedValue));
        this.dispatchSimpleCustomEvent(DatalistComponent.EVENT_SELECTION_CHANGE, this.getOutputData());
    }

    getOutputData(): KeyValueData {
        return <KeyValueData>{
            key: this.name,
            value: this.selectedValue,
        };
    }

    getDefaultInputData(): DatalistInputData {
        return <DatalistInputData>{
            componentIdentifier: DatalistComponent.IDENTIFIER,
            name: 'combobox',
            size: 1,
            options: <DatalistOption[]>[{value: 'value1', text: 'Eintrag 1'}, {
                value: 'value2',
                text: 'Eintrag 2'
            }, {value: 'value3', text: 'Eintrag 3'},],
        };
    }

    getEventList(): string[] {
        return [DatalistComponent.EVENT_SELECTION_CHANGE];
    }

    private updateSelectedText() {
        if (baseHelper.isNotBlank(this.selectedValue)) {
            for (const option of this.options) {
                if (baseHelper.isEqual(option.value, this.selectedValue)) {
                    this.selectedText = option.text
                    break;
                }
            }
        } else {
            this.selectedText = '';
        }
    }

}