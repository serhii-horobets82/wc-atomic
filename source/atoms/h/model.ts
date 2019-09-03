import {AbstractInputData} from "../../abstract/component/model";

export interface HInputData extends AbstractInputData {
    headerType: number;
    headerText: string;
    subheaderText: string;
    clazz: string;
}