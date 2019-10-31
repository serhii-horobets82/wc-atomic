import {ImgSliderInputData} from "../img-slider/model";
import {AbstractInputData} from "../../abstract-component/component";

export interface ImgSliderSelectorInputData extends AbstractInputData {
    columnFlexBasisValues: string[];
    imgSlider: ImgSliderInputData;
}