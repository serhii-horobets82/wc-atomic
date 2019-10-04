import {TemplateInputData} from "../../abstract/template/model";
import {NavigationInputData} from "../../atoms/navigation/model";
import {ToolbarInputData} from "../../organisms/toolbar/model";

export interface DefaultTemplateModel extends TemplateInputData {
    navigationInputData: NavigationInputData;
    toolbarInputData: ToolbarInputData;
}