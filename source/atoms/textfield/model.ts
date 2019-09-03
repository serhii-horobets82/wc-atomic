import {AbstractInputData} from "../../abstract/component/model";

export interface TextfieldInputData extends AbstractInputData {
    name: string;
    value?: string;
    placeholder?: string;
    maxlength?: number;
    size?: number;
}