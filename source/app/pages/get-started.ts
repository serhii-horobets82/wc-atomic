import {customElement} from "lit-element";
import {DefaultTemplate} from "../../templates/default/template";
import {H1Component} from "../../atoms/h/component";
import {CodeComponent} from "../../atoms/code/component";
import {TemplateModel} from "../../abstract/template/model";
import {DefaultTemplateModel} from "../../templates/default/model";
import {NavigationComponent} from "../../atoms/navigation/component";
import {DATA_NAVIGATION} from "../data/data";
import {HInputData} from "../../atoms/h/model";
import {CodeInputData} from "../../atoms/code/model";


@customElement('page-get-started')
export class GetStartedPage extends DefaultTemplate {

    constructor() {
        super();
    }

    initTemplateData(): DefaultTemplateModel {
        let xxxx = <HInputData>{
            componentIdentifier: H1Component.IDENTIFIER,
            headerText: 'Neue Anwendung',
        };


        let xxxxy = <CodeInputData>{
            componentIdentifier: CodeComponent.IDENTIFIER,
            code: '',
        };


        return <DefaultTemplateModel>{
            componentIdentifier: DefaultTemplate.IDENTIFIER,
            navigationInputData: DATA_NAVIGATION,
            title: 'Component Overview',
            componentInputData: [xxxx],
        };
    }


}