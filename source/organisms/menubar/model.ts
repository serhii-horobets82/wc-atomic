import {AbstractInputData} from "../../abstract/component/model";

export interface MenubarInputData extends AbstractInputData {
    clazz?: string;
    leftInputData: AbstractInputData[];
    mainInputData: AbstractInputData[];
    rightInputData: AbstractInputData[];
}