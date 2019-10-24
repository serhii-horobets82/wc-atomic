import {customElement, html, property, query, TemplateResult} from "lit-element";
import {DefaultTemplate} from "../../templates/default/template";

import {InputDataChangeEvent} from "../../input/input/model";
import {BALCO_DATA_STORE} from "../data/balco_data";
import {getDefaultTemplateInputData} from "../app-showcase";
import {HTTP_CLIENT} from "../data/data";
import {guard} from "lit-html/directives/guard";
import {repeat} from "lit-html/directives/repeat";
import {FileUploadItem} from "../../util/http-client/http-client";
import {InputComponent} from "../../input/input/component";
import {baseHelper} from "../../util/base";
import {AbstractBalcoPage} from "./abstract-balco-page";

@customElement('page-import')
export class ImportPage extends AbstractBalcoPage {

    constructor() {
        super();
        this.inputData = getDefaultTemplateInputData();
    }

    @query('#checkbox')
    checkbox: InputComponent | undefined;

    @property()
    files: FileUploadItem[] = BALCO_DATA_STORE.getLastFileUpload().files;


    getContent(): TemplateResult {
        return html`
            <component-flex-container gridClazz="grid_75 maxPaddingTop"  itemClazz="alignItemsTop" .columnFlexBasisValues="${['50%', '50%', '100%']}" >
                
                <component-img clazz="imageWidthHundred" src="${BALCO_DATA_STORE.IMG_RESOURCE_URL}import.jpg"></component-img>
                <component-flex-container gridClazz="grid_100 alignItemsCenter mediumPaddingLeft" columnFlexBasisValue="100%" >
                    <component-h1 text="${this.getI18NValue('balco_upload_header_text')}" subtext="${this.getI18NValue('balco_upload_header_subtext')}"></component-h1>
                    <component-text text="${this.getI18NValue('balco_upload_description')}"></component-text>
                    <component-spacer clazz="mediumPaddingTop"></component-spacer>
                    <component-inputfield id="checkbox" type="checkbox">${this.getI18NValue('balco_upload_delete_old_values_checkbox_text')}</component-inputfield>
                    <component-spacer clazz="mediumPaddingTop"></component-spacer>
                    <component-inputfield type="file" @component-inputfield-change="${(event: CustomEvent) => this.upload(event)}"></component-inputfield>
                    <component-link href="${BALCO_DATA_STORE.IMG_RESOURCE_URL}/example.csv">Beispiel CSV</component-link>
                </component-flex-container>

                <component-list>
                    <component-list-item clazz="primaryColor">
                    <component-spacer clazz="mediumPaddingLeft"></component-spacer>
                    <component-text text="${this.getI18NValue('upload_statistik')}">
                    </component-text>
                    </component-list-item>
                    
                     ${guard(
            this.files,
            () =>
                html`
                     ${repeat(
                    this.files,
                    (file) => html`
                    <component-list-item>
                        <component-spacer clazz="mediumPaddingLeft"></component-spacer>
                        <component-text text="${file.filename}"></component-text>
                        <component-spacer clazz="mediumPaddingLeft"></component-spacer>
                        <component-text text="${file.success ? this.getI18NValue('import_ok') : this.getI18NValue('import_failure')}"></component-text>
                        <component-spacer clazz="mediumPaddingLeft"></component-spacer>
                        <component-text text="${baseHelper.beautifyText(new Date(file.uploadDate))}"></component-text>
                    </component-list-item>
                        `
                )}
                  `
        )}


            </component-list>
                  
            </component-flex-container>
            
            
            
            
`;
    }

    private upload(event: CustomEvent) {
        let data: InputDataChangeEvent = event.detail;
        let files = data.element.files;
        HTTP_CLIENT.uploadFiles('/BALANCE/CSV/'.concat(BALCO_DATA_STORE.getSelectedCompany().idl).concat('/').concat(this.checkbox != undefined ? this.checkbox.getOutputData().value : 'false'), files).then(fileUpload => {
            BALCO_DATA_STORE.setLastFileUpload(fileUpload);
            this.files = fileUpload.files;
        }).catch(fileUpload => {
            alert("fehler" + fileUpload);
            alert(JSON.stringify(fileUpload));
        });
    }

}