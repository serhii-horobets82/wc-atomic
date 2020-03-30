import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent } from '../../abstract-component/component';
import { LinkInputData } from '../../link/component';
import { BasicService } from '@domoskanonos/frontend-basis';
import {
   AlignContent,
   AlignItems,
   FlexDirection,
   FlexJustifyContent,
   FlexWrap,
   SpacerAlignment,
   SpacerSize,
   TypographyType
} from '../..';
import { ContainerClazzValues } from '../../flex-container/component';

const componentCSS = require('./component.css');

@customElement('component-navigation-section')
export class NavigationSectionComponent extends AbstractComponent<LinkInputData, any> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'NavigationSectionComponent';

   @property()
   text: string = '';

   render() {
      return html`
         <component-spacer spacerSize="${SpacerSize.MEDIUM}" alignment="${SpacerAlignment.HORIZONTAL}"
            ><component-flex-container
               .containerClazzes="${[ContainerClazzValues.CONTAINER_100]}"
               .itemClazzes="${[]}"
               .flexDirection="${FlexDirection.ROW}"
               .flexWrap="${FlexWrap.NO_WRAP}"
               .flexJustifyContent="${FlexJustifyContent.FLEX_START}"
               .alignItems="${AlignItems.CENTER}"
               .alignContent="${AlignContent.FLEX_START}"
               .itemFlexBasisValues="${['12px', 'auto']}"
            >
               <component-spacer spacerSize="${SpacerSize.LITTLE}" alignment="${SpacerAlignment.BOTH}"></component-spacer>
               <component-typography .typographyType="${TypographyType.CAPTION}" text="${this.text}"></component-typography>
            </component-flex-container>
         </component-spacer>
      `;
   }

   getOutputData(): any {
      return {};
   }

   protected inputDataChanged() {}
}
