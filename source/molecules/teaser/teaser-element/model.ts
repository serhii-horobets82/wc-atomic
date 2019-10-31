import {ImgModel} from "../../../atoms/img/model";
import {AbstractInputData} from "../../../abstract-component/component";


export interface TeaserElementInputData extends AbstractInputData {
    selected?: boolean;
    backgroundContent: AbstractInputData[];
    foregroundContent: AbstractInputData[];
}
