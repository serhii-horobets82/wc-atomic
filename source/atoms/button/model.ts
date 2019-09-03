import {IconInputData} from "../icon/model";
import {AbstractInputData} from "../../abstract/component/model";

export interface Button extends AbstractInputData {
    clazz: string;
    text: string;
    href: string;
    clickEventData?: any;
    icon?: IconInputData;
}