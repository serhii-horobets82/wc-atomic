import {AbstractInputData} from "../../abstract-component/model";

export interface TextareaInputData extends AbstractInputData {
    name: string;
    value: string;
    rows?: number;
}