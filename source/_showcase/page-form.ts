import {customElement, html, TemplateResult} from 'lit-element';
import {PageAbstract} from './page-abstract';
import {InputComponent} from '../input/component';
import {SimpleTableRowData} from '../simple-table/component';
import {ComboboxOption} from "../combobox/component";
import {LinkComponent, LinkInputData, TypographyTypes} from "..";

@customElement('page-form')
export class PageFormComponent extends PageAbstract {
    getMainComponent(): TemplateResult {
        return html`
         <component-flex-container containerClazz="container_50">
         <component-authenticated-icon></component-authenticated-icon>
         <component-authentication loginPath="/dologin"></component-authentication>

         <component-register registerPath="/AUTH/REGISTER"></component-register>
         
         <component-change-password registerPath="/AUTH/CP"></component-change-password>
        
         </component-flex-container>
          <component-simple-table
               .headers="${['Lorem', 'Ipsum', 'Dolorem']}"
               .rows="${[
            <SimpleTableRowData>{ columns: ['Lorem', 'Ipsum', 'Dolorem'] },
            <SimpleTableRowData>{ columns: ['Lorem', 'Ipsum', 'Dolorem'] },
            <SimpleTableRowData>{ columns: ['Lorem', 'Ipsum', 'Dolorem'] },
            <SimpleTableRowData>{ columns: ['Lorem', 'Ipsum', 'Dolorem'] },
            <SimpleTableRowData>{ columns: ['Lorem', 'Ipsum', 'Dolorem'] }
        ]}"
            >
            </component-simple-table>

            <component-list>
               <component-list-item clazz="primaryColor">
                  <component-spacer clazz="mediumPaddingLeft"></component-spacer>
                  <component-text text="Lorem Ipsum Dolorem"></component-text>
               </component-list-item>
               <component-list-item>
                  <component-spacer clazz="mediumPaddingLeft"></component-spacer>
                  <component-text text="Lorem Ipsum Dolorem"></component-text>
               </component-list-item>
               <component-list-item>
                  <component-spacer clazz="mediumPaddingLeft"></component-spacer>
                  <component-text text="Lorem Ipsum Dolorem"></component-text>
               </component-list-item>
            </component-list>

            <component-breadcrumb
               .links="${[
            <LinkInputData>{
                componentIdentifier: LinkComponent.IDENTIFIER,
                text: 'Home',
                href: '/'
            }
        ]}"
            >
            </component-breadcrumb>

            <component-accordion>
               <component-accordion-item header="Accordion 1">Lorem Ipsum 1</component-accordion-item>
               <component-accordion-item header="Accordion 2">Lorem Ipsum 2</component-accordion-item>
               <component-accordion-item header="Accordion 3">Lorem Ipsum 3</component-accordion-item>
            </component-accordion>

            <component-divider></component-divider>
         </component-flex-container>
      `;
    }
}
