import {customElement, html, TemplateResult} from 'lit-element';
import {DefaultTemplate} from "../../templates/default/template";
import {DefaultTemplateModel} from "../../templates/default/model";
import {NavigationComponent} from "../../component/navigation/navigation";
import {data_navigation} from "../data/data";


@customElement('page-homepage')
export class HomePage extends DefaultTemplate {

    constructor() {
        super();


    }

    getContent(): TemplateResult {
        return html``;
    }

    initTemplateData(): DefaultTemplateModel {
        return <DefaultTemplateModel>{
            componentIdentifier: DefaultTemplate.IDENTIFIER,
            navigation: data_navigation,
            title: 'Component Overview',
            componentInputData: [],
        };
    }

}