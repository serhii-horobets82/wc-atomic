import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { IconInputData } from '../icon/component';
import { TypographyInputData } from '../typography/component';

const componentCSS = require('./component.scss');

export class IconWithTextInputData extends AbstractInputData {
   iconClazz?: string;
   cssStyle?: string;
   clickable?: boolean;
   status?: number;
   text?: string;
}

@customElement('component-icon-with-text')
export class IconWithTextComponent extends AbstractComponent<IconWithTextInputData, any> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'IconWithTextComponent';

   @property()
   iconClazz: string = '';

   @property()
   cssStyle: string = '';

   @property()
   title: string = '';

   @property()
   clickable: boolean = false;

   @property()
   status: number = 1;

   @property()
   text: string = '';

   render() {
      return html`
         <component-flex-container>
            <component-icon iconClazz="${this.iconClazz}"></component-icon>
            <component-typography text="fdfdfo"></component-typography>
         </component-flex-container>
      `;
   }

   getDefaultInputData(): IconInputData {
      return <IconInputData>{
         componentIdentifier: IconWithTextComponent.IDENTIFIER,
         iconClazz: 'fas fa-question',
         clickable: true,
         status: 1,
         text: 'Text'
      };
   }

   inputDataChanged() {
      this.iconClazz = this.basicService.getValue(this.inputData.iconClazz, '');
      this.cssStyle = this.basicService.getValue(this.inputData.cssStyle, '');
      this.status = this.basicService.getValue(this.inputData.status, 1);
      this.clickable = this.basicService.getValue(this.inputData.clickable, false);
      this.text = this.basicService.getValue(this.inputData.text, '');
   }

   getOutputData(): any {
      return undefined;
   }
}
