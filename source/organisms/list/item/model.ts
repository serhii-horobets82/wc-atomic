import {AbstractInputData} from "../../../abstract-component/model";

export interface ListItemInputData extends AbstractInputData {
    clazz?: string;
    content: AbstractInputData[];
}