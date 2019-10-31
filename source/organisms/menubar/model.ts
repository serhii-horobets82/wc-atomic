import {AbstractInputData} from "../../abstract-component/component";

export interface MenubarInputData extends AbstractInputData {
    clazz?: string;
    leftInputData: AbstractInputData[];
    mainInputData: AbstractInputData[];
    rightInputData: AbstractInputData[];
}