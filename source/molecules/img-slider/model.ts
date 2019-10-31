import {ImgModel} from "../../atoms/img/model";
import {AbstractInputData} from "../../abstract-component/model";

/**
 *
 * maxHeight:
 * limit the size of the slider,
 * if horizontal is maxHeight = maxWidth,
 * if vertical is maxHeight = maxHeight
 *
 * sliderType:
 * 1 = Horizontal
 * 2 = Vertical
 */
export interface ImgSliderInputData extends AbstractInputData {
    sliderType: number;
    maxSize: string;
    imgs: ImgModel[];
}