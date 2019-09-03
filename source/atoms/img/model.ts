import {AbstractInputData} from "../../interface/atoms";

export interface ImgModel extends AbstractInputData {
    src: string;
    clazz?: string;
    text?: string;
    cssStyle?: string;
}