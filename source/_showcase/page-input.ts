import {customElement, html, TemplateResult} from 'lit-element';
import {PageAbstract} from './page-abstract';
import {InputComponent} from '../input/component';
import {TypographyTypes} from '../typography/component';
import {SimpleTableRowData} from '../simple-table/component';
import {ComboboxOption} from "../combobox/component";

@customElement('page-inputfield')
export class PageInputComponent extends PageAbstract {
    getMainComponent(): TemplateResult {
        return html`
         <component-flex-container gridClazz="grid_50">
         
         <component-typography .type="${TypographyTypes.H2}">Input Components</component-typography>
         <component-typography>This component is the main component for formular, like contact formular, login formular</component-typography>



        <component-typography .type="${TypographyTypes.H2}">Properties of component</component-typography>

        <component-simple-table .headers="${[
            this.i18nService.getValue('property_name'),
            this.i18nService.getValue('property_typ'),
            this.i18nService.getValue('property_allowed_values'),
            this.i18nService.getValue('property_example')
        ]}" .rows="${[
            <SimpleTableRowData>{columns: ['value', 'string', '', 'my value']},
            <SimpleTableRowData>{columns: ['placeholder', 'string', '', 'my placeholder']},
            <SimpleTableRowData>{columns: ['maxlength', 'number', '', '']},
            <SimpleTableRowData>{columns: ['size', 'number', '', '']},
            <SimpleTableRowData>{columns: ['min', 'number', '', '']},
            <SimpleTableRowData>{columns: ['max', 'number', '', '']},
            <SimpleTableRowData>{
                columns: [
                    'type',
                    'string',
                    'button, checkbox, color, date, datetime-local, email, file, hidden, image, month, number, password, radio, range, reset, search, submit, tel, text, time, url, week',
                    'text'
                ]
            }
        ]}">
        </component-simple-table>


         <component-typography .type="${TypographyTypes.H2}">Simple Textfield</component-typography>
         
            <component-tabs>
               <component-tab slot="tab" selected="true" tabContentId="exampleContent">${this.i18nService.getValue(
            'tab_example'
        )}</component-tab>
               <component-tab slot="tab" tabContentId="htmlContent">${this.i18nService.getValue('tab_html')}</component-tab>
               <component-tab slot="tab" tabContentId="cssContent">${this.i18nService.getValue('tab_css')}</component-tab>
               <component-tab-content slot="tabContent" id="exampleContent" selected="true">
                  <component-tile cssStyle="height:500px; width:500px;">
                     <component-inputfield required="true"></component-inputfield>
                  </component-tile>
               </component-tab-content>
               <component-tab-content slot="tabContent" id="htmlContent">
                  <component-code>
                     <component-typography text="<component-inputfield></component-inputfield>"></component-typography>
                  </component-code>
               </component-tab-content>
               <component-tab-content slot="tabContent" id="cssContent">
                  <component-code>
                     ${InputComponent.styles
            .toString()
            .substr(0, InputComponent.styles.toString().indexOf('/*#') - 3)
            .trim()}
                  </component-code>
               </component-tab-content>
            </component-tabs>

         <component-typography>Datefield</component-typography>
         
            <component-tabs>
               <component-tab slot="tab" selected="true" tabContentId="exampleContent">${this.i18nService.getValue(
            'tab_example'
        )}</component-tab>
               <component-tab slot="tab" tabContentId="htmlContent">${this.i18nService.getValue('tab_html')}</component-tab>
               <component-tab-content slot="tabContent" id="exampleContent" selected="true">
                  <component-tile cssStyle="height:500px; width:500px;">
                  
                <component-form>
                     <component-inputfield type="date"></component-inputfield>
                     <component-inputfield type="datetime-local"></component-inputfield>
                     <component-inputfield type="week"></component-inputfield>
                     <component-inputfield type="month"></component-inputfield>
                     <component-inputfield type="time"></component-inputfield>
                </component-form>
                    
                     
                  </component-tile>
               </component-tab-content>
               <component-tab-content slot="tabContent" id="htmlContent">
                  <component-code>
                     <component-typography text="<component-inputfield type=&quot;date&quot;></component-inputfield>"></component-typography>
                  </component-code>
               </component-tab-content>
            </component-tabs>


         <component-typography>Number</component-typography>
         
            <component-tabs>
               <component-tab slot="tab" selected="true" tabContentId="exampleContent">${this.i18nService.getValue(
            'tab_example'
        )}</component-tab>
               <component-tab slot="tab" tabContentId="htmlContent">${this.i18nService.getValue('tab_html')}</component-tab>
               <component-tab-content slot="tabContent" id="exampleContent" selected="true">
                  <component-tile cssStyle="height:500px; width:500px;">
                     <component-inputfield type="number"></component-inputfield>
                  </component-tile>
               </component-tab-content>
               <component-tab-content slot="tabContent" id="htmlContent">
                  <component-code>
                     <component-typography text="<component-inputfield type=&quot;date&quot;></component-inputfield>"></component-typography>
                  </component-code>
               </component-tab-content>
            </component-tabs>

        <component-typography>Email</component-typography>
         
            <component-tabs>
               <component-tab slot="tab" selected="true" tabContentId="exampleContent">${this.i18nService.getValue(
            'tab_example'
        )}</component-tab>
               <component-tab slot="tab" tabContentId="htmlContent">${this.i18nService.getValue('tab_html')}</component-tab>
               <component-tab-content slot="tabContent" id="exampleContent" selected="true">
                  <component-tile cssStyle="height:500px; width:500px;">
                      <component-inputfield type="email"></component-inputfield>
                  </component-tile>
               </component-tab-content>
               <component-tab-content slot="tabContent" id="htmlContent">
                  <component-code>
                     <component-typography text="<component-inputfield type=&quot;date&quot;></component-inputfield>"></component-typography>
                  </component-code>
               </component-tab-content>
            </component-tabs>
            
         </component-flex-container>



<component-datalist></component-datalist>

<component-combobox .options="${[<ComboboxOption>{value:'', text:''},<ComboboxOption>{value:'item1', text:'First Entry'},<ComboboxOption>{value:'item2', text:'Second Entry'},<ComboboxOption>{value:'item3', text:'Third Entry'}]}">
</component-combobox>



<component-search></component-search>

<component-textarea></component-textarea>


         </component-flex-container>
         
      `;
    }
}
