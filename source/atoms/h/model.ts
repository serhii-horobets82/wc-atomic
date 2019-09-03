import {AbstractInputData} from "../../interface/atoms";

export interface HInputData extends AbstractInputData {
    headerType: number;
    headerText: string;
    subheaderText: string;
    clazz: string;
}