import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { BasicService } from '@domoskanonos/frontend-basis';

export class ColorType {
   static PRIMARY_COLOR: string = 'PRIMARY_COLOR';
   static SECONDARY_COLOR: string = 'SECONDARY_COLOR';
   static SURFACE_COLOR: string = 'SURFACE_COLOR';
   static BACKGROUND_COLOR: string = 'BACKGROUND_COLOR';
}

export class ColorInputData extends AbstractInputData {
   componentIdentifier = ColorComponent.IDENTIFIER;
   colorType: string = ColorType.BACKGROUND_COLOR;
   textColor?: string = '';
   backgroundColor?: string = '';
}

const componentCSS = require('./component.css');

@customElement('component-color')
export class ColorComponent extends AbstractComponent<ColorInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'ColorComponent';

   @property()
   colorType: string = ColorType.BACKGROUND_COLOR;

   @property()
   textColor: string = '';

   @property()
   backgroundColor: string = '';

   render() {
      return html`
         <slot
            class="${this.colorType}"
            style="${BasicService.getUniqueInstance().isNotBlank(this.textColor)
               ? 'color: '.concat(this.textColor).concat(';')
               : ''}${BasicService.getUniqueInstance().isNotBlank(this.backgroundColor)
               ? 'background-color: '.concat(this.backgroundColor).concat(';')
               : ''}"
         ></slot>
      `;
   }

   getOutputData(): undefined {
      return undefined;
   }

   protected inputDataChanged() {
      let defaultData: ColorInputData = new ColorInputData();
      this.colorType = BasicService.getUniqueInstance().getValue(this.inputData.colorType, defaultData.colorType);
      this.textColor = BasicService.getUniqueInstance().getValue(this.inputData.textColor, defaultData.textColor);
      this.backgroundColor = BasicService.getUniqueInstance().getValue(
         this.inputData.backgroundColor,
         defaultData.backgroundColor
      );
   }
}
