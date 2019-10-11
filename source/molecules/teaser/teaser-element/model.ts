import {ImgModel} from "../../../atoms/img/model";
import {AbstractInputData} from "../../../abstract/component/model";


export interface TeaserElementInputData extends AbstractInputData {
    selected?: boolean;
    backgroundContent: AbstractInputData[];
    foregroundContent: AbstractInputData[];
}
