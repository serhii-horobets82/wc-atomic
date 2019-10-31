import {AccordionItemInputData} from "../item/model";
import {AbstractInputData} from "../../../abstract-component/component";

export interface AccordionInputData extends AbstractInputData {
    items: AccordionItemInputData[];
}