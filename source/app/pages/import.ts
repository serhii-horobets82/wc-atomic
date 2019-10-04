import {customElement, html, query, TemplateResult} from "lit-element";
import {DefaultTemplate} from "../../templates/default/template";
import {DefaultTemplateModel} from "../../templates/default/model";
import {DEFAULT_TEMPLATE_INPUT_DATA, HTTP_CLIENT} from "../data/data";
import {InputDataChangeEvent} from "../../input/input/model";
import {BALCO_DATA_STORE} from "../data/balco_data";
import {CheckboxComponent} from "../../input/checkbox/component";

@customElement('page-import')
export class ImportPage extends DefaultTemplate {

    constructor() {
        super();
    }

    initTemplateData(): DefaultTemplateModel {
        return DEFAULT_TEMPLATE_INPUT_DATA;
    }

    @query('#checkbox')
    checkbox: CheckboxComponent | undefined;

    getContent(): TemplateResult {
        return html`
            <component-flex-container gridClazz="grid_100 alignItemsCenter maxPadding" columnFlexBasisValue="100%" >
                <component-h1 text="Hinweis" subtext="Saldenliste importieren"></component-h1>
                <component-text text="Importieren Sie hier Ihre Saldenliste im CSV-Format. Der Aufbau der Datei muss wie in der Beispieldatei sein. Sie können den Import beliebig oft wiederholen. Um Ihre bisherigen Salden zu löschen klicken Sie auf die Checkbox 'Alte Salden löschen'."></component-text>
                <component-spacer clazz="mediumPaddingTop">ssss</component-spacer>
                <component-checkbox id="checkbox">Alte Salden löschen</component-checkbox>
                <component-spacer clazz="mediumPaddingTop">ssss</component-spacer>
                <component-inputfield type="file" @component-inputfield-change="${(event: CustomEvent) => this.upload(event)}"></component-inputfield>
            </component-flex-container>`;
    }

    private upload(event: CustomEvent) {
        let data: InputDataChangeEvent = event.detail;
        let files = data.element.files;
        HTTP_CLIENT.uploadFiles('/BALANCE/CSV/'.concat(BALCO_DATA_STORE.getSelectedCompany().idl).concat('/').concat(this.checkbox != undefined ? this.checkbox.getOutputData().value ? 'true' : 'false' : 'false'), files);
    }

}