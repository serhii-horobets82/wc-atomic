import {AbstractInputData} from "../../abstract/component/model";

export interface DateInputData extends AbstractInputData {
    name: string;
    placeholder: string;
    value: string;
    min?: string;
    max?: string;
}