import {AbstractInputData} from "../../../abstract-component/model";
import {ListItemInputData} from "../item/model";

export interface ListInputData extends AbstractInputData {
    items: ListItemInputData[];
}