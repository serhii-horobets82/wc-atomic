import {AbstractInputData} from "../../abstract-component/model";

export interface DatalistOption {
    value: string;
    text: string;
    selected?: boolean;
}

export interface DatalistInputData extends AbstractInputData {
    name: string;
    size: number;
    selectedValue: string | undefined;
    options: DatalistOption[];
}