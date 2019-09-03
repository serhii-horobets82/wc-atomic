import {AbstractInputData} from "../../abstract/component/model";
import {TemplateModel} from "../../abstract/template/model";
import {NavigationInputData} from "../../atoms/navigation/model";

export interface DefaultTemplateModel extends TemplateModel {
    navigation: NavigationInputData;
}