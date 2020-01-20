import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { TypographyInputData } from '../typography/component';
import { RichMediaInputData, SpacerAlignment, SpacerSize } from '..';
import { BasicService } from '@domoskanonos/frontend-basis';

const componentCSS = require('./component.scss');

export class PrimaryTitleInputData extends AbstractInputData {
   richMedia: RichMediaInputData | undefined;
   primaryTitle: TypographyInputData | undefined;
   secondaryTitle: TypographyInputData | undefined;
}

@customElement('component-primary-title')
export class PrimaryTitleComponent extends AbstractComponent<PrimaryTitleInputData, any> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'PrimaryTitleComponent';

   @property()
   richMedia: RichMediaInputData | undefined;

   @property()
   primaryTitle: TypographyInputData = new TypographyInputData();

   @property()
   secondaryTitle: TypographyInputData = new TypographyInputData();

   render() {
      return html`
         <component-flex-container
            containerClazz="container_100"
            .itemFlexBasisValues="${this.richMedia != undefined ? ['20%', '80%'] : ['100%']}"
         >
            <component-container .rendered="${this.richMedia != undefined}">
               <component-rich-media .inputData="${this.richMedia}"></component-rich-media>
            </component-container>
            <component-flex-container containerClazz="container_100" itemFlexBasisValue="100%" .>
               <component-typography .inputData="${this.primaryTitle}"></component-typography>
               <component-typography .inputData="${this.secondaryTitle}"></component-typography>
            </component-flex-container>
         </component-flex-container>
      `;
   }

   getDefaultInputData(): PrimaryTitleInputData {
      return <PrimaryTitleInputData>{
         componentIdentifier: PrimaryTitleComponent.IDENTIFIER
      };
   }

   inputDataChanged() {
      this.richMedia = BasicService.getInstance().getValue(this.inputData.richMedia, undefined);
      this.primaryTitle = BasicService.getInstance().getValue(this.inputData.primaryTitle, undefined);
      this.secondaryTitle = BasicService.getInstance().getValue(this.inputData.secondaryTitle, undefined);
   }

   getOutputData(): any {
      return undefined;
   }
}
