import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { IconInputData } from '../icon/component';
import {TypographyInputData, TypographyType} from '../typography/component';
import { BasicService } from '@domoskanonos/frontend-basis';
import { ToolbarAlignment } from '../toolbar/component';
import {ElementState} from "../meta-data/element-state";

const componentCSS = require('./component.css');

export class IconWithTextInputData extends AbstractInputData {
   icon: string = '';
   cssStyle: string = '';
   clickable: boolean = false;
   elementState: string = ElementState.ACTIVE_FOCUSED;
   text: string = '';
}

@customElement('component-icon-with-text')
export class IconWithTextComponent extends AbstractComponent<IconWithTextInputData, any> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'IconWithTextComponent';

   @property()
   icon: string = '';

   @property()
   cssStyle: string = '';

   @property()
   title: string = '';

   @property()
   clickable: boolean = false;

   @property()
   elementState: string = ElementState.ACTIVE_FOCUSED;

   @property()
   text: string = '';

   render() {
      return html`
         <component-toolbar
            .toolbarAlignment="${ToolbarAlignment.VERTICAL}"
            class="${this.elementState}${this.clickable ? ' clickable' : ''}"
         >
            <component-icon .withIconSpace="${false}" icon="${this.icon}" .elementState="${this.elementState}"></component-icon>
            <component-typography .typographyType="${TypographyType.OVERLINE}" text="${this.text}"></component-typography>
         </component-toolbar>
      `;
   }

   inputDataChanged() {
      let defaultData: IconWithTextInputData = new IconWithTextInputData();
      this.icon = BasicService.getUniqueInstance().getValue(this.inputData.elementState, defaultData.icon);
      this.elementState = BasicService.getUniqueInstance().getValue(this.inputData.elementState, defaultData.elementState);
      this.cssStyle = BasicService.getUniqueInstance().getValue(this.inputData.cssStyle, defaultData.cssStyle);
      this.clickable = BasicService.getUniqueInstance().getValue(this.inputData.clickable, defaultData.clickable);
      this.text = BasicService.getUniqueInstance().getValue(this.inputData.text, defaultData.text);
   }

   getOutputData(): any {
      return undefined;
   }
}
