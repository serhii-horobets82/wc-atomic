import {css, customElement, html, property, query, unsafeCSS} from 'lit-element';
import {guard} from 'lit-html/directives/guard';
import {repeat} from 'lit-html/directives/repeat';
import {AbstractComponent} from "../../abstract-component/component";
import {DatalistInputData, DatalistOption} from "./model";
import {KeyValueData} from "../../organisms/form/model";


const componentCSS = require('./component.css');

@customElement('component-datalist')
export class DatalistComponent extends AbstractComponent<DatalistInputData, KeyValueData> {

    static styles = css`${unsafeCSS(componentCSS)}`;

    static IDENTIFIER: string = 'DatalistComponent';

    static EVENT_SELECTION_CHANGE: string = 'combobox-datalist-selection-change';

    @property()
    size: number = 1;

    @property()
    options: DatalistOption[] = [];

    @property()
    selectedValue: string = '';

    @property()
    selectedText: string = 'h';

    @query("#item")
    inputfield: HTMLInputElement | undefined;

    render() {
        return html`<span>
           <input id="item" list="items" type="text" value="${this.selectedText}" @change="${(event: Event) => this.onChange(event)}"/>
            <datalist id="items" size="${this.size}" >
                ${guard([this.options], () => html`${
            repeat(this.options, option => option.value, (option) => this.basicService.isEqual(this.selectedValue, option.value) ? html`
                        <option value="${option.value}" selected>${option.text}</option>
                    ` : html`
                        <option value="${option.value}">${option.text}</option>
                    `)}
                `)}
            </datalist>
            </span>
        `;
    }

    protected inputDataChanged() {
        this.size = this.basicService.getValue(this.inputData.size, 1);
        this.options = this.basicService.cloneArray(this.basicService.getValue(this.inputData.options, []));
        this.selectedValue = this.basicService.getValue(this.inputData.selectedValue, '');
        this.selectedText = this.getSelectedText();
        console.log(this.inputfield);
        if(this.inputfield!= null){
            this.inputfield.value = this.selectedText;
            this.inputfield.defaultValue = this.selectedText;
        }
    }

    async onChange(event: Event) {
        let inputElement: HTMLInputElement = <HTMLInputElement>event.target;
        this.selectedValue = inputElement.value;
        this.inputData.selectedValue = this.selectedValue;
        this.options = this.basicService.cloneArray(this.basicService.getValue(this.inputData.options, []));
        this.selectedText = this.getSelectedText();
        inputElement.value = this.selectedText;
        inputElement.defaultValue = this.selectedText;
        console.log('selected value change, new value: '.concat(this.selectedValue));
        console.log('selected value change, new selectedText: '.concat(this.selectedText));
       //this.dispatchSimpleCustomEvent(DatalistComponent.EVENT_SELECTION_CHANGE, this.getOutputData());
    }

    getOutputData(): KeyValueData {
        return <KeyValueData>{
            key: this.inputData.name,
            value: this.selectedValue,
        };
    }

    getDefaultInputData(): DatalistInputData {
        return <DatalistInputData>{
            componentIdentifier: DatalistComponent.IDENTIFIER,
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

    private getSelectedText(): string {
        if (this.basicService.isNotBlank(this.inputData.selectedValue)) {
            for (const option of this.inputData.options) {
                if (this.basicService.isEqual(option.value, this.selectedValue)) {
                    return option.text;
                }
            }
        }
        return '';
    }

}