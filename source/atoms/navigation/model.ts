import {LinkInputData} from "../link/model";
import {AbstractInputData} from "../../abstract-component/component";

export interface NavigationLinkInputData extends LinkInputData {
    icon: string;
}

export interface NavigationInputData extends AbstractInputData {
    clazz?: string;
    links: NavigationLinkInputData[];
    contentBefore?: AbstractInputData[];
    contentAfter?: AbstractInputData[];
}