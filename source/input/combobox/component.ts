import {css, customElement, html, property, query, unsafeCSS} from 'lit-element';
import {guard} from 'lit-html/directives/guard';
import {repeat} from 'lit-html/directives/repeat';
import {AbstractComponent} from "../../abstract/component/component";
import {ComboboxInputData, ComboboxOption} from "./model";
import {baseHelper} from "../../util/base";
import {KeyValueData} from "../../organisms/form/model";

const componentCSS = require('./component.css');

@customElement('component-combobox')
export class ComboboxComponent extends AbstractComponent<ComboboxInputData, KeyValueData> {

    static styles = css`${unsafeCSS(componentCSS)}`;

    static IDENTIFIER: string = 'ComboboxComponent';

    static EVENT_SELECTION_CHANGE: string = 'combobox-component-selection-change';

    @property()
    name: string = '';

    @property()
    size: number = 1;

    @property()
    options: ComboboxOption[] = [];

    @property()
    selectedValue: string = '';

    protected inputDataChanged() {
        this.name = baseHelper.getValue(this.inputData.name, '');
        this.size = baseHelper.getValue(this.inputData.size, 1);
        this.selectedValue = baseHelper.getValue(this.inputData.selectedValue, '');
        this.options = baseHelper.getValue(this.inputData.options, <ComboboxOption>{});
    }

    render() {
        return html`
            <select name="${this.name}" size="${this.size}" @change="${(event: Event) => this.onChange(event)}">
                ${guard([this.options], () => html`${
            repeat(this.options, option => option.value, (option) => baseHelper.isEqual(this.selectedValue, option.value) ? html`
                        <option value="${option.value}" selected>${option.text}</option>
                    ` : html`
                        <option value="${option.value}">${option.text}</option>
                    `)}
                `)}

            </select>                            
        `;
    }

    private onChange(event: Event) {
        let selectElement: HTMLSelectElement | null = <HTMLSelectElement>event.target;
        this.selectedValue = selectElement != null ? selectElement.value : '';
        console.log('selected value change, new value: '.concat(this.selectedValue));
        this.dispatchSimpleCustomEvent(ComboboxComponent.EVENT_SELECTION_CHANGE, this.getOutputData());
    }

    getOutputData(): KeyValueData {
        return <KeyValueData>{
            key: this.name,
            value: this.selectedValue,
        };
    }

    getDefaultInputData(): ComboboxInputData {
        return <ComboboxInputData>{
            componentIdentifier: ComboboxComponent.IDENTIFIER,
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