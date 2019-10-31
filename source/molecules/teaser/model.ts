import {AbstractInputData} from "../../abstract-component/model";
import {TeaserElementInputData} from "./teaser-element/model";

export interface TeaserContainerInputData extends AbstractInputData {
    items: TeaserElementInputData[];
}