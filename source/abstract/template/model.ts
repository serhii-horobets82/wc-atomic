import {AbstractInputData} from "../component/model";

export interface TemplateModel extends AbstractInputData {
    title: string;
    componentInputData: AbstractInputData[];
}