import {AbstractInputData, Navigation} from "../../interface/atoms";
import {TemplateModel} from "../base/model";

export interface DefaultTemplateModel extends TemplateModel {
    navigation: Navigation;
}