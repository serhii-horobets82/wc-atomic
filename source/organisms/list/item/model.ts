import {AbstractInputData} from "../../../abstract-component/component";

export interface ListItemInputData extends AbstractInputData {
    clazz?: string;
    content: AbstractInputData[];
}