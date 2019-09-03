import {customElement, html, query, TemplateResult} from 'lit-element';
import {DefaultTemplate} from "../../templates/default/template";
import {FormComponent} from "../../organisms/form/component";
import {HComponent} from "../../atoms/h/component";
import {HttpClient} from "../../util/http-client";
import {DefaultTemplateModel} from "../../templates/default/model";
import {data_navigation} from "../data/data";


@customElement('page-form')
export class FormPage extends DefaultTemplate {

    constructor() {
        super();
    }

    @query('#myForm')
    myForm: FormComponent;

    getContent(): TemplateResult {

        let h = HComponent.create(2);
        h.text = 'Kontaktformular';
        h.subtext = 'Nehmen Sie Kontakt zu uns auf';

        return html`
         <component-flex-container gridClazz="grid_75">
         ${h}
            <component-form
               .inputData="${new FormComponent().getDefaultInputData()}"
               id="myForm"
               @component-button-click="${this.submit}"
            ></component-form>
         </component-flex-container>
      `;
    }

    submit(event: CustomEvent) {
        console.log('submit form: ' + event.detail);
        let httpClient = new HttpClient({baseURL: 'http://localhost:8090'});

        let outputData = this.myForm.getOutputData();
        console.log('output data: ' + JSON.stringify(outputData));
    }

    initTemplateData(): DefaultTemplateModel {
        return <DefaultTemplateModel> {
            componentIdentifier : DefaultTemplate.IDENTIFIER,
            navigation : data_navigation,
            title : 'Form'
        };
    }
}
