import {customElement, html, TemplateResult} from 'lit-element';
import {DefaultTemplate} from "../../templates/default/template";
import {DefaultTemplateModel} from "../../templates/default/model";
import {NavigationComponent} from "../../atoms/navigation/component";
import {DATA_NAVIGATION} from "../data/data";


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
            navigationInputData: DATA_NAVIGATION,
            title: 'Component Overview',
            componentInputData: [],
        };
    }

}