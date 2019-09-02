import {AbstractInputData} from "../../interface/atoms";

export interface AccordionItemInputData extends AbstractInputData{
    header: string;
    componentData: AbstractInputData;
    stateClazz: string;
}

export interface AccordionInputData extends AbstractInputData {
    items: AccordionItemInputData[];
}