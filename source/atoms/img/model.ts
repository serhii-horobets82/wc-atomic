import {AbstractInputData} from "../../abstract/component/model";

export interface ImgModel extends AbstractInputData {
    src: string;
    clazz?: string;
    text?: string;
    cssStyle?: string;
}