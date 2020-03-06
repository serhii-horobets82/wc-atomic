import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { TypographyInputData, TypographyType } from '../typography/component';

@customElement('page-cc')
export class PageElementList extends PageAbstract {
   getMainComponent(): TemplateResult {
      return html`
         
         <component-list>
               <component-list-item clazz="PRIMARY_COLOR">guzguz
                  <component-spacer clazz="mediumPaddingLeft"></component-spacer>
                  <component-typography>Lorem Ipsum Dolorem</component-typography>
               </component-list-item>
               <component-list-item>
                  <component-spacer clazz="mediumPaddingLeft"></component-spacer>
                  <component-typography>Lorem Ipsum Dolorem</component-typography>
               </component-list-item>
               <component-list-item>
                  <component-spacer clazz="mediumPaddingLeft"></component-spacer>
                  <component-typography>Lorem Ipsum Dolorem</component-typography>
               </component-list-item>
            </component-list>
         
      `;
   }
}
