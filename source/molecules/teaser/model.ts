import {TeaserElementInputData} from "./teaser-element/model";
import {AbstractInputData} from "../../abstract-component/component";

export interface TeaserContainerInputData extends AbstractInputData {
    items: TeaserElementInputData[];
}