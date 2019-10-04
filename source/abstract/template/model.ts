import {AbstractInputData} from "../component/model";

export interface TemplateInputData extends AbstractInputData {
    title: string;
    componentInputData: AbstractInputData[];
}