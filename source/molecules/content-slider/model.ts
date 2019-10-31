import {AbstractInputData} from "../../abstract-component/component";

export interface ContentSliderInputData extends AbstractInputData {
    open: boolean;
    componentInputData: AbstractInputData;
}