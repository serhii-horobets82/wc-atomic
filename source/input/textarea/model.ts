import {AbstractInputData} from "../../abstract-component/component";

export interface TextareaInputData extends AbstractInputData {
    name: string;
    value: string;
    rows?: number;
}