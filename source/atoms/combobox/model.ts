import {AbstractInputData} from "../../abstract/component/model";

export interface ComboboxOption {
    value: string;
    text: string;
}

export interface ComboboxInputData extends AbstractInputData {
    name: string;
    size: number;
    options: ComboboxOption[];
}