import {KeyValueData} from "../../organisms/form/model";
import {AbstractInputData} from "../../abstract-component/component";

export interface InputInputData extends AbstractInputData {
    name: string;
    value?: string;
    placeholder?: string;
    maxlength?: number;
    size?: number;
    min?: number;
    max?: number;
    type?: string;
}

export interface InputDataChangeEvent {
    type: string;
    outputData: KeyValueData,
    element: HTMLInputElement,
}