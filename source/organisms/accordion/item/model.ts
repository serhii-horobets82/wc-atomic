import {AbstractInputData} from "../../../abstract/component/model";

export interface AccordionItemInputData extends AbstractInputData{
    header: string;
    componentData: AbstractInputData;
    stateClazz: string;
}