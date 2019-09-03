import {AbstractInputData} from "../../interface/atoms";

export interface CodeInputData extends AbstractInputData {
    code: string;
}

export interface ToolbarInputData extends AbstractInputData {
    leftInputData: AbstractInputData[];
    mainInputData: AbstractInputData[];
    rightInputData: AbstractInputData[];
}