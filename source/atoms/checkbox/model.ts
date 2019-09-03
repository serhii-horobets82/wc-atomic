import {AbstractInputData} from "../../abstract/component/model";

export interface CheckboxInputData extends AbstractInputData {
    checked: boolean;
    name: string;
}