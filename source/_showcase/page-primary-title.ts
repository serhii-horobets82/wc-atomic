import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { InputComponent } from '../input/component';
import { RichMediaComponent, RichMediaInputData } from '../rich-media/component';
import {TypographyInputData, TypographyType} from '../typography/component';
import {FlexJustifyContent} from "../flex-container/component";

@customElement('page-primary-title')
export class PagePrimaryTitleComponent extends PageAbstract {
   getMainComponent(): TemplateResult {
      return html`
         <component-flex-container containerClazz="container_25">
            <component-primary-title
               .richMedia="${<RichMediaInputData>{src: 'https://picsum.photos/50/50'}}"
               .primaryTitle="${<TypographyInputData>{
          typographyType: TypographyType.H6,
          text: 'Title goes here'
      }}"
               .secondaryTitle="${<TypographyInputData>{
          typographyType: TypographyType.CAPTION,
          text: 'Secondary text'
      }}"
            ></component-primary-title>
         </component-flex-container>
      `;
   }
}
