import {AbstractInputData} from "../../abstract-component/model";
import {LinkInputData} from "../../atoms/link/model";

export interface BreadcrumbInputData extends AbstractInputData {
    links: LinkInputData[];
}