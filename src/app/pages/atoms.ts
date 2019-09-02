import {DefaultTemplate} from "../../templates/default/template";
import {customElement, TemplateResult, html} from "lit-element";
import {DefaultTemplateModel} from "../../templates/default/model";
import {Navigation} from "../../interface/atoms";
import {NavigationComponent} from "../../component/navigation/navigation";
import {data_navigation} from "../data/data";
import {ImgComponent} from "../../atoms/img/component";


@customElement('page-atoms')
export class AtomsPage extends DefaultTemplate {

    constructor() {
        super();
    }

    initTemplateData(): DefaultTemplateModel {
        return <DefaultTemplateModel>{
            componentIdentifier: DefaultTemplate.IDENTIFIER,
            navigation: data_navigation,
        }
    }

    getContent(): TemplateResult {
        return html`
           <component-component-viewer .componentInputData="${new ImgComponent().getDefaultInputData()}"></component-component-viewer>
      `;
    }

}