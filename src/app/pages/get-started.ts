import {customElement} from "lit-element";
import {DefaultTemplate} from "../../templates/default/template";
import {H1Component} from "../../atoms/h/component";
import {CodeComponent, Component} from "../../atoms/code/component";
import {TemplateModel} from "../../abstract/template/model";
import {DefaultTemplateModel} from "../../templates/default/model";
import {NavigationComponent} from "../../atoms/navigation/component";
import {data_navigation} from "../data/data";
import {HInputData} from "../../atoms/h/model";


@customElement('page-get-started')
export class GetStartedPage extends DefaultTemplate {

    initTemplateData(): DefaultTemplateModel {
        let xxxx = <HInputData>{
            componentIdentifier: H1Component.IDENTIFIER,
            headerText: 'Neue Anwendung',
        };


        let xxxxy = <Component>{
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