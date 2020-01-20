import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { InputfieldComponent } from '../inputfield/component';
import { SimpleTableRowData } from '../simple-table/component';
import { ComboboxOption } from '../combobox/component';
import { LinkComponent, LinkInputData, TypographyType } from '..';

@customElement('page-form')
export class PageFormComponent extends PageAbstract {
   getMainComponent(): TemplateResult {
      return html`
         <component-flex-container containerClazz="container_50" itemFlexBasisValue="100%">
            <component-authentication loginPath="/dologin"></component-authentication>
            <component-register></component-register>
            <component-change-password registerPath="/AUTH/CP"></component-change-password>
         </component-flex-container>
      `;
   }
}
