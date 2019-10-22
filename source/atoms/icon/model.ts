import {AbstractInputData} from "../../abstract/component/model";

/**
 * iconClazz:
 * clazzName for the icon
 *
 * clickable:
 * if true, mouse is cursor type pointer and a event is pushed.
 *
 * status:
 * 1 = normal
 * 2 = aktiv
 * 3 = passiv
 */
export interface IconInputData extends AbstractInputData {
    iconClazz?: string;
    cssStyle?: string;
    clickable?: boolean;
    status?: number;
}