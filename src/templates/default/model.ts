import {AbstractInputData, Navigation} from "../../interface/atoms";
import {TemplateModel} from "../../abstract/template/model";

export interface DefaultTemplateModel extends TemplateModel {
    navigation: Navigation;
}