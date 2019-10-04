import {AbstractInputData} from "../../abstract/component/model";
import {KeyValueOutputData} from "../../organisms/form/model";

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
    outputData: KeyValueOutputData,
    element: HTMLInputElement,
}