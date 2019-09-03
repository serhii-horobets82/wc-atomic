import {css, customElement, html, property, query, unsafeCSS} from 'lit-element';
import {AbstractComponent} from "../../abstract/component/component";
import {KeyValueOutputData} from "../../organisms/form/component";
import {RangeSliderInputData} from "./model";

const componentCSS = require('./component.css');


@customElement('component-range-slider')
export class RangeSliderComponent extends AbstractComponent<RangeSliderInputData, KeyValueOutputData> {

    static styles = css`${unsafeCSS(componentCSS)}`;

    static IDENTIFIER: string = 'RangeSliderComponent';

    static EVENT_VALUE_CHANGE: string = 'component-range-slider-change';

    @property()
    name: string;

    @property()
    value: string;

    @property()
    max: number;

    @property()
    min: number;

    @query('#rangeElement')
    private rangeElement: HTMLInputElement;

    render() {
        return html`
            <input id="rangeElement" @change="${this.valueChange}" name="${this.name}" type="range" max="${this.max}" min="${this.min}" value="${this.value}"/>
`;
    }

    async valueChange(event: Event) {
        this.dispatchSimpleCustomEvent(RangeSliderComponent.EVENT_VALUE_CHANGE, this.rangeElement.value);
    }

    getDefaultInputData(): RangeSliderInputData {
        return <RangeSliderInputData>{
            componentIdentifier: RangeSliderComponent.IDENTIFIER,
            name: 'name',
            min: 10,
            max: 30,
        };
    }

    getOutputData(): KeyValueOutputData {
        let value = this.rangeElement != null ? this.rangeElement.value : this.value;
        return <KeyValueOutputData>{
            key: this.name,
            value: value,
        };
    }

    protected inputDataChanged() {
        this.value = this.inputData.value;
        this.name = this.inputData.name;
        this.min = this.inputData.min;
        this.max = this.inputData.max;
    }

    getEventList(): string[] {
        return [RangeSliderComponent.EVENT_VALUE_CHANGE];
    }

}
