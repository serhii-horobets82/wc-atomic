import {customElement, html, property, query, TemplateResult} from "lit-element";
import {DefaultTemplate} from "../../templates/default/template";

import {InputDataChangeEvent} from "../../input/input/model";
import {BALCO_DATA_STORE} from "../data/balco_data";
import {DEFAULT_TEMPLATE_INPUT_DATA} from "../app-showcase";
import {HTTP_CLIENT} from "../data/data";
import {guard} from "lit-html/directives/guard";
import {repeat} from "lit-html/directives/repeat";
import {FileUploadItem} from "../../util/http-client/http-client";

@customElement('page-import')
export class ImportPage extends DefaultTemplate {

    constructor() {
        super();
        this.inputData = DEFAULT_TEMPLATE_INPUT_DATA;
    }

    @query('#checkbox')
    checkbox: HTMLInputElement | undefined;

    @property()
    files: FileUploadItem[] = BALCO_DATA_STORE.getLastFileUpload().files;


    getContent(): TemplateResult {
        return html`
            <component-flex-container gridClazz="grid_100 maxPadding"  itemClazz="alignItemsTop" columnFlexBasisValue="50%" >
                <component-img clazz="imageWidthHundred" src="${BALCO_DATA_STORE.IMG_RESOURCE_URL}import.jpg"></component-img>
                <component-flex-container gridClazz="grid_100 alignItemsCenter mediumPaddingLeft" columnFlexBasisValue="100%" >
                    <component-h1 text="${this.getI18NValue('balco_upload_header_text')}" subtext="${this.getI18NValue('balco_upload_header_subtext')}"></component-h1>
                    <component-text text="${this.getI18NValue('balco_upload_description')}"></component-text>
                    <component-spacer clazz="mediumPaddingTop"></component-spacer>
                    <component-inputfield id="checkbox" type="checkbox">${this.getI18NValue('balco_upload_delete_old_values_checkbox_text')}</component-inputfield>
                    <component-spacer clazz="mediumPaddingTop"></component-spacer>
                    <component-inputfield type="file" @component-inputfield-change="${(event: CustomEvent) => this.upload(event)}"></component-inputfield>
                    
                    
                    <component-list>
                    <component-list-item>
                        <component-text text="${this.getI18NValue('upload_statistik')}"></component-text>
                   </component-list-item>
                     
             
                    
                     ${guard(
            this.files,
            () =>
                html`
                     ${repeat(
                    this.files,
                    (file) => html`

                    <component-list-item>
                        <component-text text="${file.filename}"></component-text>
                        <component-text text="${file.success ? this.getI18NValue('import_ok') : this.getI18NValue('import_failure')}"></component-text>
                    </component-list-item>
                          
                        `
                )}
                  `
        )}
                 
                 </component-list>   
                    
                </component-flex-container>
            </component-flex-container>
`;
    }

    private upload(event: CustomEvent) {
        let data: InputDataChangeEvent = event.detail;
        let files = data.element.files;
        HTTP_CLIENT.uploadFiles('/BALANCE/CSV/'.concat(BALCO_DATA_STORE.getSelectedCompany().idl).concat('/').concat(this.checkbox != undefined ? this.checkbox.checked ? 'true' : 'false' : 'false'), files).then(fileUpload => {
            BALCO_DATA_STORE.setLastFileUpload(fileUpload);
            this.files = fileUpload.files;
        }).catch(fileUpload => {
            alert("fehler" + fileUpload);
            alert(JSON.stringify(fileUpload));
        });
    }

}