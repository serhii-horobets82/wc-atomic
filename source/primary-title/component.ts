import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { TypographyInputData } from '../typography/component';
import { RichMediaInputData, SpacerAlignment, SpacerSize } from '..';

const componentCSS = require('./component.scss');

export class PrimaryTitleInputData extends AbstractInputData {
   thumbnail?: string;
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
      this.richMedia = this.basicService.getValue(this.inputData.thumbnail, undefined);
      this.primaryTitle = this.basicService.getValue(this.inputData.primaryTitle, undefined);
      this.secondaryTitle = this.basicService.getValue(this.inputData.secondaryTitle, undefined);
   }

   getOutputData(): any {
      return undefined;
   }
}
