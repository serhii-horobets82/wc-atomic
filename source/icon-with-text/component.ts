import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { IconInputData, IconState } from '../icon/component';
import { TypographyInputData, TypographyType } from '../typography/component';
import { BasicService } from '@domoskanonos/frontend-basis';
import { ToolbarAlignment } from '../toolbar/component';

const componentCSS = require('./component.scss');

export class IconWithTextInputData extends AbstractInputData {
   icon: string = '';
   cssStyle: string = '';
   clickable: boolean = false;
   iconState: string = IconState.ACTIVE_FOCUSED;
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
   iconState: string = IconState.ACTIVE_FOCUSED;

   @property()
   text: string = '';

   render() {
      return html`
         <div class="icon-with-text${this.clickable ? ' clickable' : ''} ${this.iconState}">
            <component-icon .withIconSpace="${false}" icon="${this.icon}" .iconState="${this.iconState}"></component-icon>
            <component-typography .type="${TypographyType.OVERLINE}" text="${this.text}"></component-typography>
         </div>
      `;
   }

   inputDataChanged() {
      let defaultData: IconWithTextInputData = new IconWithTextInputData();
      this.icon = BasicService.getInstance().getValue(this.inputData.iconState, defaultData.icon);
      this.iconState = BasicService.getInstance().getValue(this.inputData.iconState, defaultData.iconState);
      this.cssStyle = BasicService.getInstance().getValue(this.inputData.cssStyle, defaultData.cssStyle);
      this.clickable = BasicService.getInstance().getValue(this.inputData.clickable, defaultData.clickable);
      this.text = BasicService.getInstance().getValue(this.inputData.text, defaultData.text);
   }

   getOutputData(): any {
      return undefined;
   }
}
