import {AbstractInputData} from "../../abstract/component/model";
import {KeyValueData} from "../../organisms/form/model";

export interface InputInputData extends AbstractInputData {
    name: string;
    value?: string;
    placeholder?: string;
    maxlength?: number;
    size?: number;
    type?: string;
}

export interface InputDataChangeEvent {
    type: string;
    outputData: KeyValueData,
    element: HTMLInputElement,
}