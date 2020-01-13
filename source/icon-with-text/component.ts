import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from '../abstract-component/component';
import {IconState} from '../icon/component';
import {TypographyTypes} from '../typography/component';

const componentCSS = require('./component.scss');

export class IconWithTextInputData extends AbstractInputData {
   icon: string = '';
   cssStyle: string = '';
   clickable: boolean = false;
   iconState: string = IconState.DEFAULT;
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
   iconState: string = IconState.DEFAULT;

   @property()
   text: string = '';

   render() {
      return html`
         <div class="icon-with-text ${this.clickable ? 'clickable' : ''}">
            <component-icon .withIconSpace="${false}" icon="${this.icon}" .iconState="${this.iconState}"></component-icon>
            <component-typography .type="${TypographyTypes.OVERLINE}" text="${this.text}"></component-typography>
         </div>
      `;
   }

   inputDataChanged() {
      let defaultData: IconWithTextInputData = new IconWithTextInputData();
      this.icon = this.basicService.getValue(this.inputData.iconState, defaultData.icon);
      this.iconState = this.basicService.getValue(this.inputData.iconState, defaultData.iconState);
      this.cssStyle = this.basicService.getValue(this.inputData.cssStyle, defaultData.cssStyle);
      this.clickable = this.basicService.getValue(this.inputData.clickable, defaultData.clickable);
      this.text = this.basicService.getValue(this.inputData.text, defaultData.text);
   }

   getOutputData(): any {
      return undefined;
   }
}
