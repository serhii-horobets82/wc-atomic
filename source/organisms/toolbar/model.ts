import {AbstractInputData} from "../../abstract-component/component";

export interface ToolbarInputData extends AbstractInputData {
    clazz?: string;
    leftInputData: AbstractInputData[];
    mainInputData: AbstractInputData[];
    rightInputData: AbstractInputData[];
}