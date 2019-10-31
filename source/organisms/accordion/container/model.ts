import {AbstractInputData} from "../../../abstract-component/model";
import {AccordionItemInputData} from "../item/model";

export interface AccordionInputData extends AbstractInputData {
    items: AccordionItemInputData[];
}