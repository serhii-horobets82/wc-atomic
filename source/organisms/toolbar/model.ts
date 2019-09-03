import {AbstractInputData} from "../../abstract/component/model";

export interface ToolbarInputData extends AbstractInputData {
    leftInputData: AbstractInputData[];
    mainInputData: AbstractInputData[];
    rightInputData: AbstractInputData[];
}