import {ListItemInputData} from "../item/model";
import {AbstractInputData} from "../../../abstract-component/component";

export interface ListInputData extends AbstractInputData {
    items: ListItemInputData[];
}