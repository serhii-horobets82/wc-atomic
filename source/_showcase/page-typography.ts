import {customElement, html, TemplateResult} from 'lit-element';
import {PageAbstract} from './page-abstract';
import {InputComponent} from '../input/component';
import {HTypes} from '../h/component';
import {SimpleTableRowData} from '../simple-table/component';
import {ComboboxOption} from "../combobox/component";

@customElement('page-typography')
export class PageTypographyComponent extends PageAbstract {
    getMainComponent(): TemplateResult {
        return html`
         <component-flex-container gridClazz="grid_50">
         
         <component-h>Typography</component-h>
         <component-text>Typography</component-text>


<component-h .hType="${HTypes.H2}">HTypes of component</component-h>

        <component-simple-table .headers="${[
            this.i18nService.getValue('hType'),
            this.i18nService.getValue('hType_description')
        ]}" .rows="${[
            <SimpleTableRowData>{columns: ['H1', 'H1',]},
            <SimpleTableRowData>{columns: ['H2', 'H2',]},
            <SimpleTableRowData>{columns: ['H3', 'H3',]},
            <SimpleTableRowData>{columns: ['H4', 'H4',]},
            <SimpleTableRowData>{columns: ['H5', 'H5',]},
            <SimpleTableRowData>{columns: ['H6', 'H6',]},
            <SimpleTableRowData>{columns: ['SUBTITLE1', '',]},
            <SimpleTableRowData>{columns: ['SUBTITLE2', '',]},
            <SimpleTableRowData>{columns: ['BODY1', '',]},
            <SimpleTableRowData>{columns: ['BODY2', '',]},
            <SimpleTableRowData>{columns: ['BUTTON', '',]},
            <SimpleTableRowData>{columns: ['CAPTION', '',]},
            <SimpleTableRowData>{columns: ['OVERLINE', '',]},
        ]}">
        </component-simple-table>
        

        <component-h .hType="${HTypes.H2}">Properties of component</component-h>

         <component-h>Header</component-h>
         
            <component-tabs>
               <component-tab slot="tab" selected="true" tabContentId="exampleContent">${this.i18nService.getValue(
            'tab_example'
        )}</component-tab>
               <component-tab slot="tab" tabContentId="htmlContent">${this.i18nService.getValue('tab_html')}</component-tab>
               <component-tab slot="tab" tabContentId="cssContent">${this.i18nService.getValue('tab_css')}</component-tab>
               <component-tab-content slot="tabContent" id="exampleContent" selected="true">
                  <component-tile cssStyle="height:500px; width:500px;">
                     <component-h .hType="${HTypes.H1}">H1</component-h>
                     <component-h .hType="${HTypes.H2}">H2</component-h>
                     <component-h .hType="${HTypes.H3}">H3</component-h>
                     <component-h .hType="${HTypes.H4}">H4</component-h>
                     <component-h .hType="${HTypes.H5}">H5</component-h>
                     <component-h .hType="${HTypes.H6}">H6</component-h>
                     <component-h .hType="${HTypes.BODY1}">Body 1</component-h>
                     <component-h .hType="${HTypes.BODY2}">Body 2</component-h>
                     <component-h .hType="${HTypes.BUTTON}">Button</component-h>
                     <component-h .hType="${HTypes.CAPTION}">Caption</component-h>
                     <component-h .hType="${HTypes.OVERLINE}">Overline</component-h>
                     <component-h .hType="${HTypes.SUBTITLE1}">Subtitle 1</component-h>
                     <component-h .hType="${HTypes.SUBTITLE2}">Subtitle 2</component-h>
                  </component-tile>
               </component-tab-content>
               <component-tab-content slot="tabContent" id="htmlContent">
                  <component-code>
                     <component-text text=""></component-text>
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

        

         </component-flex-container>
         
      `;
    }
}
