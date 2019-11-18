import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import {TypographyInputData} from "../typography/component";

const componentCSS = require('./component.css');

export class TextWithHeaderInputData extends AbstractInputData {
   headerInputData?: TypographyInputData;
   textInputData?: TypographyInputData;
}

@customElement('component-typography-with-header')
export class TextWithHeaderComponent extends AbstractComponent<TextWithHeaderInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'TextWithHeaderComponent';

   @property()
   headerInputData: TypographyInputData = <TypographyInputData>{};

   @property()
   textInputData: TypographyInputData = <TypographyInputData>{};

   render() {
      return html`
         <component-typography .inputData="${this.headerInputData}"></component-typography>
         <component-typography .inputData="${this.textInputData}"></component-typography>
      `;
   }

   getDefaultInputData(): TextWithHeaderInputData {
      return <TextWithHeaderInputData>{
         componentIdentifier: TextWithHeaderComponent.IDENTIFIER,
         headerInputData: new TypographyInputData(),
         textInputData: new TypographyInputData()
      };
   }

   getOutputData(): any {
      return undefined;
   }

   protected inputDataChanged() {
      this.headerInputData = this.basicService.getValue(this.inputData.headerInputData, new TypographyInputData());
      this.textInputData = this.basicService.getValue(this.inputData.textInputData, new TypographyInputData());
   }
}
