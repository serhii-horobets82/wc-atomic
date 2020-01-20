import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { IconInputData, IconState } from '../icon/component';
import { TypographyInputData, TypographyTypes } from '../typography/component';
import { BasicService } from '@domoskanonos/frontend-basis';
import { ToolbarAlignment } from '../toolbar/component';

const componentCSS = require('./component.scss');

export class IconWithTextInputData extends AbstractInputData {
   iconInputData: IconInputData = new IconInputData();
   typographyInputData: TypographyInputData = new TypographyInputData();
   clickable: boolean = false;
}

@customElement('component-icon-with-text')
export class IconWithTextComponent extends AbstractComponent<IconWithTextInputData, any> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'IconWithTextComponent';

   @property()
   iconInputData: IconInputData = new IconWithTextInputData().iconInputData;
   @property()
   typographyInputData: TypographyInputData = new IconWithTextInputData().typographyInputData;
   @property()
   clickable: boolean = false;

   render() {
      return html`
         <component-toolbar
            .toolbarAlignment="${ToolbarAlignment.VERTICAL}"
            class="${this.clickable ? ' clickable' : ''} ${this.iconInputData.iconState}"
         >
            <component-icon .inputData="${this.iconInputData}"></component-icon>
            <component-typography .inputData="${this.typographyInputData}"></component-typography>
         </component-toolbar>
      `;
   }

   inputDataChanged() {
      let defaultData: IconWithTextInputData = new IconWithTextInputData();
      this.iconInputData = BasicService.getInstance().getValue(this.inputData.iconInputData, defaultData.iconInputData);
      this.typographyInputData = BasicService.getInstance().getValue(
         this.inputData.typographyInputData,
         defaultData.typographyInputData
      );
      this.clickable = BasicService.getInstance().getValue(this.inputData.clickable, defaultData.clickable);
   }

   getOutputData(): any {
      return undefined;
   }
}
