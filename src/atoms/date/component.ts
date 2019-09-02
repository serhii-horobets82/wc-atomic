import {css, customElement, html, property, query, unsafeCSS} from 'lit-element';
import {AbstractComponent} from "../../abstract/abstract-component";
import {KeyValueOutputData} from "../../organisms/form/container/organism";
import {DateInputData} from "./model";

const componentCSS = require('./component.css');

@customElement('component-date')
export class DateComponent extends AbstractComponent<DateInputData, KeyValueOutputData> {

    static styles = css`${unsafeCSS(componentCSS)}`;

    static IDENTIFIER: string = 'DateComponent';

    static EVENT_VALUE_CHANGE: string = 'component-date-value-change';

    @property()
    name: string;

    @property()
    placeholder: string;

    @property()
    value: string;

    @property()
    min: string | undefined;

    @property()
    max: string | undefined;

    @query('#dateElement')
    private dateElement: HTMLInputElement;

    render() {
        return html`
            <input id="dateElement" type="date" @change="${this.valueChange}" name="${this.name}" value="${this.value}" min="${this.min}" max="${this.max}" />
`;
    }

    async valueChange(event: Event) {
        this.dispatchSimpleCustomEvent(DateComponent.EVENT_VALUE_CHANGE);
    }

    getDefaultInputData(): DateInputData {
        return <DateInputData>{
            componentIdentifier: DateComponent.IDENTIFIER,
            name: 'datefield',
            placeholder: 'date',
            value: '01-01-2019',
            min: '1',
            max: '10',
        };
    }

    getOutputData(): KeyValueOutputData {
        let value = this.dateElement != null ? this.dateElement.value : this.value;
        return <KeyValueOutputData>{
            key: this.name,
            value: value,
        };
    }

    protected inputDataChanged() {
        this.value = this.inputData.value;
        this.name = this.inputData.name;
        this.placeholder = this.inputData.placeholder;
        this.max = this.inputData.max;
        this.min = this.inputData.min;
    }

    getEventList(): string[] {
        return [DateComponent.EVENT_VALUE_CHANGE];
    }

}
