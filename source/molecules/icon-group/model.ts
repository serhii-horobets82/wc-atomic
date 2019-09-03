import {AbstractInputData} from "../../abstract/component/model";
import {IconInputData} from "../../atoms/icon/model";

export interface IconGroupInputData extends AbstractInputData {
    clazz?: string;
    icons: IconInputData[];
}