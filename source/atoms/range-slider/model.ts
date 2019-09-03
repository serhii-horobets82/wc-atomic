import {AbstractInputData} from "../../abstract/component/model";

export interface RangeSliderInputData extends AbstractInputData {
    value: string;
    name: string;
    min: number;
    max: number;
}