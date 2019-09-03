import {ImgModel} from "../../atoms/img/model";
import {AbstractInputData} from "../../abstract/component/model";

export interface TeaserElementInputData {
    selected: boolean;
    img: ImgModel;
    content: AbstractInputData;
}

export interface TeaserContainerInputData extends AbstractInputData {
    items: TeaserElementInputData[];
}