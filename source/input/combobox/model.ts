import {AbstractInputData} from "../../abstract-component/model";

export interface ComboboxOption {
    value: string;
    text: string;
    selected?: boolean;
}

export interface ComboboxInputData extends AbstractInputData {
    name?: string;
    size?: number;
    cssStyle?: string;
    selectedValue?: string;
    options: ComboboxOption[];
}