import {AbstractInputData} from "../../interface/atoms";

export interface CheckboxInputData extends AbstractInputData {
    checked: boolean;
    name: string;
}