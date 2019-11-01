import {AbstractInputData} from "../../abstract-component/component";
import {IconInputData} from "../../icon/component";

export interface IconGroupInputData extends AbstractInputData {
    clazz?: string;
    icons: IconInputData[];
}