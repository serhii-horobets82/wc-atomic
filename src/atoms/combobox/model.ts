import {AbstractInputData} from "../../interface/atoms";

export interface ComboboxOption {
    value: string;
    text: string;
}

export interface ComboboxInputData extends AbstractInputData {
    name: string;
    size: number;
    options: ComboboxOption[];
}