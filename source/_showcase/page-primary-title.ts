import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { InputComponent } from '../input/component';
import { ImgComponent, ImgInputData } from '../img/component';
import { TypographyInputData, TypographyTypes } from '../typography/component';
import {FlexJustifyContent} from "../flex-container/component";

@customElement('page-primary-title')
export class PagePrimaryTitleComponent extends PageAbstract {
   getMainComponent(): TemplateResult {
      return html`
         <component-flex-container containerClazz="container_25">
            <component-primary-title
               thumbnail="https://picsum.photos/300/300"
               .primaryTitle="${<TypographyInputData>{
                  type: TypographyTypes.H6,
                  text: 'Title goes here'
               }}"
               .secondaryTitle="${<TypographyInputData>{
                  type: TypographyTypes.CAPTION,
                  text: 'Secondary text'
               }}"
            ></component-primary-title>
         </component-flex-container>
      `;
   }
}
