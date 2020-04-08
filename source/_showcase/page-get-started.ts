import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { TypographyInputData, TypographyType } from '../typography/component';
import {ColorType} from "..";

@customElement('page-get-started')
export class PageGetStarted extends PageAbstract {
   getMainComponent(): TemplateResult {
      return html`
         <component-flex-container .containerClazzes="${["CONTAINER_50"]}" itemFlexBasisValue="100%">
            <component-spacer clazz="maxPaddingTop"></component-spacer>
            <component-typography .typographyType="${TypographyType.H2}" text="1">Base Project</component-typography>
            <component-color colorType="${ColorType.BACKGROUND_COLOR}">
            <component-typography>
               clone base template from github to start your client app<component-link href="https://github.com/domoskanonos/wc-atomic-template"
                  >wc-atomic-template</component-link
               >
            </component-typography></component-color>
         </component-flex-container>
      `;
   }
}
