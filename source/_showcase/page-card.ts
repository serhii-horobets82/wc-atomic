import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { InputComponent } from '../input/component';
import { RichMediaComponent, RichMediaInputData } from '../rich-media/component';
import { TypographyInputData, TypographyTypes } from '../typography/component';
import { SimpleTableRowData } from '../simple-table/component';
import { LinkComponent, LinkInputData } from '../link/component';
import { FlexJustifyContent } from '../flex-container/component';

@customElement('page-card')
export class PageCardComponent extends PageAbstract {
   getMainComponent(): TemplateResult {
      return html`
         <component-flex-container containerClazz="container_25">
            <component-card>
               <component-ripple>
                  <component-rich-media
                     src="https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg"
                     clazz="imageWidthHundred"
                  ></component-rich-media>
                  <component-card-primary-title>
                     <component-primary-title
                        .primaryTitle="${<TypographyInputData>{
                           type: TypographyTypes.H4,
                           text: 'Our Changing Planet'
                        }}"
                        .secondaryTitle="${<TypographyInputData>{
                           type: TypographyTypes.SUBTITLE2,
                           text: 'by Kurt Wagner'
                        }}"
                     ></component-primary-title>
                  </component-card-primary-title>
                  <component-card-supporting-text>
                     <component-typography .type="${TypographyTypes.BODY2}"
                        >Visit ten places on our planet that are undergoing the biggest changes today.</component-typography
                     >
                  </component-card-supporting-text>
               </component-ripple>
               <component-card-actions>
                  <component-flex-container>
                     <component-toolbar .justifyContent="${FlexJustifyContent.FLEX_END}">
                        <component-icon icon="favorite_border"></component-icon>
                        <component-icon icon="star_border"></component-icon>
                        <component-icon icon="star_border"></component-icon>
                     </component-toolbar>
                  </component-flex-container>
               </component-card-actions>
            </component-card>
         </component-flex-container>
      `;
   }
}
