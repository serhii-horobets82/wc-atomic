import {AbstractInputData} from "../../../interface/atoms";
import {AccordionItemInputData} from "../item/model";

export interface AccordionInputData extends AbstractInputData {
    items: AccordionItemInputData[];
}