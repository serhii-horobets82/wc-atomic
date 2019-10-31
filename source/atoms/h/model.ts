import {AbstractInputData} from "../../abstract-component/component";

export interface HInputData extends AbstractInputData {
    headerType: number;
    headerText: string;
    subheaderText: string;
    clazz: string;
}