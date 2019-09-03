import {AbstractInputData} from "../../abstract/component/model";

export interface ContentSliderInputData extends AbstractInputData {
    open: boolean;
    componentInputData: AbstractInputData;
}