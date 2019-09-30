import {css, customElement, html, property, query, unsafeCSS} from 'lit-element';
import {guard} from 'lit-html/directives/guard';
import {repeat} from 'lit-html/directives/repeat';
import {AbstractComponent} from "../../abstract/component/component";
import {DatalistInputData, DatalistOption} from "./model";
import {KeyValueOutputData} from "../../organisms/form/model";

const componentCSS = require('./component.css');

@customElement('component-datalist')
export class DatalistComponent extends AbstractComponent<DatalistInputData, KeyValueOutputData> {

    static styles = css`${unsafeCSS(componentCSS)}`;

    static IDENTIFIER: string = 'DatalistComponent';

    static EVENT_SELECTION_CHANGE: string = 'combobox-datalist-selection-change';

    @property()
    name: string = '';

    @property()
    size: number = 1;

    @property()
    options: DatalistOption[] = [];

    @query('#selectElement')
    private selectElement: HTMLSelectElement | undefined;

    protected inputDataChanged() {
        this.name = this.inputData.name;
        this.size = this.inputData.size;
        if (this.inputData.options != undefined) {
            this.options = this.inputData.options;
        }
        this.registerDynamicDataChannel(this.inputData.dataListChannel);
    }

    render() {
        return html`
  <input list="options" name="option">
            <datalist id="options" name="${this.name}" size="${this.size}" @change="${this.selectionChange}">
                ${guard([this.options], () => html`${
            repeat(this.options, option => option.value, (option, index) => html`
                        <option value="${option.value}">${option.text}</option>
                    `)}
                `)}
            </datalist>
        `;
    }

    async selectionChange(event: Event) {
        this.dispatchSimpleCustomEvent(DatalistComponent.EVENT_SELECTION_CHANGE, this.getOutputData());
    }

    getOutputData(): KeyValueOutputData {
        let value = this.selectElement != null ? this.selectElement.value : '';
        return <KeyValueOutputData>{
            key: this.name,
            value: value,
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

    dynamicData(channel: string, dynamicData: string) {
        super.dynamicData(channel, dynamicData);
        switch (channel) {
            case this.inputData.dataListChannel:
                this.options = JSON.parse(dynamicData);
                break;
        }
    }

}