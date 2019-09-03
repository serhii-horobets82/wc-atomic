import {AbstractInputData} from "../../abstract/component/model";
import {LinkInputData} from "../link/model";

export interface NavigationLinkInputData extends LinkInputData {
    icon: string;
}

export interface NavigationInputData extends AbstractInputData {
    links: NavigationLinkInputData[];
}