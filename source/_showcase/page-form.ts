import {customElement, html, TemplateResult} from 'lit-element';
import {PageAbstract} from './page-abstract';
import {InputComponent} from '../input/component';
import {TypographyTypes} from '../typography/component';
import {SimpleTableRowData} from '../simple-table/component';
import {ComboboxOption} from "../combobox/component";

@customElement('page-form')
export class PageFormComponent extends PageAbstract {
    getMainComponent(): TemplateResult {
        return html`
         <component-flex-container containerClazz="container_50">
         <component-authenticated-icon></component-authenticated-icon>
         <component-authentication></component-authentication>
        
         </component-flex-container>
         
      `;
    }
}
