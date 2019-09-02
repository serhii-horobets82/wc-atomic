import {AbstractInputData} from "../../interface/atoms";

export interface DateInputData extends AbstractInputData {
    name: string;
    placeholder: string;
    value: string;
    min?: string;
    max?: string;
}