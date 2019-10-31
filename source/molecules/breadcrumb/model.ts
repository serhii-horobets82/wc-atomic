import {LinkInputData} from "../../atoms/link/model";
import {AbstractInputData} from "../../abstract-component/component";

export interface BreadcrumbInputData extends AbstractInputData {
    links: LinkInputData[];
}