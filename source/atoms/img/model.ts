import {AbstractInputData} from "../../abstract-component/component";

export interface ImgModel extends AbstractInputData {
    src: string;
    clazz?: string;
    text?: string;
    cssStyle?: string;
}