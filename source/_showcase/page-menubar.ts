import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { InputComponent } from '../input/component';

@customElement('page-menubar')
export class PageMenubarComponent extends PageAbstract {
   getMainComponent(): TemplateResult {
      return html`
         <component-flex-container gridClazz="grid_50">

            <component-menubar>
               <component-icon slot="leftComponents" iconClazz="fas fa-bars" clickable="true"></component-icon>
               <span slot="mainComponents">My Menu</span>
               <component-icon slot="rightComponents" iconClazz="fas fas fa-share-alt" clickable="true"></component-icon>
            </component-menubar>
         </component-flex-container>
      `;
   }
}
