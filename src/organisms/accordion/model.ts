import {AbstractInputData} from "../../interface/atoms";

export interface AccordionItem {
    header: string;
    componentData: AbstractInputData;
    stateClazz: string;
}

export interface AccordionInputData extends AbstractInputData {
    items: AccordionItem[];
}