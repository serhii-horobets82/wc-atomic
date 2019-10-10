import {LinkInputData} from "../link/model";
import {AbstractInputData} from "../../abstract/component/model";

export interface NavigationLinkInputData extends LinkInputData {
    icon: string;
}

export interface NavigationInputData extends AbstractInputData {
    links: NavigationLinkInputData[];
    contentBefore?: AbstractInputData[];
    contentAfter?: AbstractInputData[];
}