import {AbstractInputData} from "../../abstract-component/component";
import {IconInputData} from "../../icon/component";

export interface ButtonInputData extends AbstractInputData {
    clazz: string;
    text: string;
    href: string;
    selected:boolean;
    clickEventData?: any;
    icon?: IconInputData;
}