import {AbstractInputData} from "../../abstract/component/model";
import {KeyValueData} from "../../organisms/form/model";

export interface FormElementInputData extends AbstractInputData {
    label: string;
    componentData: AbstractInputData;
}

export interface FormElementOutputData {
    data: KeyValueData[];
}

