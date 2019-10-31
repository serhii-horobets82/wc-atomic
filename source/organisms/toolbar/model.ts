import {AbstractInputData} from "../../abstract-component/model";

export interface ToolbarInputData extends AbstractInputData {
    clazz?: string;
    leftInputData: AbstractInputData[];
    mainInputData: AbstractInputData[];
    rightInputData: AbstractInputData[];
}