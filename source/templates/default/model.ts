import {TemplateModel} from "../../abstract/template/model";
import {NavigationInputData} from "../../atoms/navigation/model";
import {ToolbarInputData} from "../../organisms/toolbar/model";

export interface DefaultTemplateModel extends TemplateModel {
    navigationInputData: NavigationInputData;
    toolbarInputData: ToolbarInputData;
}