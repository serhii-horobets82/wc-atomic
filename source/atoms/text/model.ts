import {AbstractInputData} from "../../abstract/component/model";

export interface TextInputData extends AbstractInputData {
    text?: string;
    clazz?: string;
    cssStyle?: string;
    title?: string;
}