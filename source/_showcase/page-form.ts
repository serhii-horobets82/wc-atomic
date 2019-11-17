import {customElement, html, TemplateResult} from 'lit-element';
import {PageAbstract} from './page-abstract';
import {InputComponent} from '../input/component';
import {HTypes} from '../h/component';
import {SimpleTableRowData} from '../simple-table/component';
import {ComboboxOption} from "../combobox/component";

@customElement('page-form')
export class PageFormComponent extends PageAbstract {
    getMainComponent(): TemplateResult {
        return html`
         <component-flex-container gridClazz="grid_50">
         
         <component-authentication></component-authentication>
        
         </component-flex-container>
         
      `;
    }
}
