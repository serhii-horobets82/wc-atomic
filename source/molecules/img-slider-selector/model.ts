import {ImgSliderInputData} from "../img-slider/model";
import {AbstractInputData} from "../../abstract-component/model";

export interface ImgSliderSelectorInputData extends AbstractInputData {
    columnFlexBasisValues: string[];
    imgSlider: ImgSliderInputData;
}