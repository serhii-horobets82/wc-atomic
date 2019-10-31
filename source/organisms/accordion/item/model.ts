import {AbstractInputData} from "../../../abstract-component/component";

export interface AccordionItemInputData extends AbstractInputData{
    header: string;
    componentData: AbstractInputData;
    stateClazz: string;
}