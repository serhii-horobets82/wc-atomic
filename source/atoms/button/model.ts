import {IconInputData} from "../icon/model";
import {AbstractInputData} from "../../abstract-component/component";

export interface ButtonInputData extends AbstractInputData {
    clazz: string;
    text: string;
    href: string;
    selected:boolean;
    clickEventData?: any;
    icon?: IconInputData;
}