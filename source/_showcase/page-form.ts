import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { InputComponent } from '../input/component';
import { SimpleTableRowData } from '../simple-table/component';
import { ComboboxOption } from '../combobox/component';
import { LinkComponent, LinkInputData, TypographyType } from '..';

@customElement('page-form')
export class PageFormComponent extends PageAbstract {
   getMainComponent(): TemplateResult {
      return html`
         <component-flex-container containerClazz="container_50">
            <component-authentication loginPath="/dologin"></component-authentication>
            <component-register></component-register>
            <component-change-password registerPath="/AUTH/CP"></component-change-password>
         </component-flex-container>
      `;
   }
}
