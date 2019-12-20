import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { TypographyInputData, TypographyTypes } from '../typography/component';

@customElement('page-element-list')
export class PageElementList extends PageAbstract {
   getMainComponent(): TemplateResult {
      return html`
         <component-element-list>
            <component-rich-media src="https://picsum.photos/300/400"></component-rich-media>
            <component-rich-media src="https://picsum.photos/300/400"></component-rich-media>
            <component-rich-media src="https://picsum.photos/300/200"></component-rich-media>
            <component-rich-media src="https://picsum.photos/300/600"></component-rich-media>
            <component-rich-media src="https://picsum.photos/300/400"></component-rich-media>
            <component-rich-media src="https://picsum.photos/300/400"></component-rich-media>
            <component-rich-media src="https://picsum.photos/300/400"></component-rich-media>
            <component-rich-media src="https://picsum.photos/300/400"></component-rich-media>
         </component-element-list>
      `;
   }
}
