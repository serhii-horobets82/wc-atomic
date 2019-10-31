import {IconInputData} from "../../atoms/icon/model";
import {AbstractInputData} from "../../abstract-component/component";

export interface IconGroupInputData extends AbstractInputData {
    clazz?: string;
    icons: IconInputData[];
}