import {AbstractInputData} from "../../interface/atoms";
import {IconInputData} from "../../atoms/icon/model";

export interface IconGroupInputData extends AbstractInputData {
    clazz?: string;
    icons: IconInputData[];
}