import {AbstractInputData} from "../../interface/atoms";

export interface TemplateModel extends AbstractInputData {
    title: string;
    componentInputData: AbstractInputData[];
}