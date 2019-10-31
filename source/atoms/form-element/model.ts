import {KeyValueData} from "../../organisms/form/model";
import {AbstractInputData} from "../../abstract-component/component";

export interface FormElementInputData extends AbstractInputData {
    label: string;
    componentData: AbstractInputData;
}

export interface FormElementOutputData {
    data: KeyValueData[];
}

