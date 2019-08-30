import {customElement} from "lit-element";
import {DefaultTemplate} from "../../templates/default/template";
import {H} from "../../interface/atoms";
import {H1Component} from "../../component/h/h";
import {CodeComponent, Code} from "../../component/code/code";
import {TemplateModel} from "../../abstract/template/model";
import {DefaultTemplateModel} from "../../templates/default/model";
import {NavigationComponent} from "../../component/navigation/navigation";
import {data_navigation} from "../data/data";


@customElement('page-get-started')
export class GetStartedPage extends DefaultTemplate {

    initTemplateData(): DefaultTemplateModel {
        let xxxx = <H>{
            componentIdentifier: H1Component.IDENTIFIER,
            headerText: 'Neue Anwendung',
        };


        let xxxxy = <Code>{
            componentIdentifier: CodeComponent.IDENTIFIER,
            code: '',
        };


        return <DefaultTemplateModel>{
            componentIdentifier: DefaultTemplate.IDENTIFIER,
            navigation: data_navigation,
            title: 'Component Overview',
            componentInputData: [xxxx],
        };
    }

    constructor() {
        super();



    }


}