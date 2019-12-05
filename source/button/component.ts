import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { IconInputData } from '../icon/component';

const componentCSS = require('./component.css');

export class ButtonInputData extends AbstractInputData {
   clazz?: string;
   text?: string;
   href?: string;
   selected?: boolean;
   clickEventData?: any;
   icon?: IconInputData;
}

@customElement('component-button')
export class ButtonComponent extends AbstractComponent<ButtonInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'ButtonComponent';

   static EVENT_CLICK: string = 'component-button-click';

   @property()
   icon: IconInputData = <IconInputData>{};

   @property()
   clazz: string = '';

   @property()
   text: string = '';

   @property()
   href: string = '';

   @property()
   selected: boolean = false;

   @property()
   clickEventData: any = {};

   getDefaultInputData(): ButtonInputData {
      return <ButtonInputData>{
         componentIdentifier: ButtonComponent.IDENTIFIER,
         clazz: '',
         text: 'Mein Button',
         href: '/',
         clickEventData: 'defaultClick'
      };
   }

   protected inputDataChanged() {
      this.icon = this.basicService.getValue(this.inputData.icon, <IconInputData>{});
      this.text = this.basicService.getValue(this.inputData.text, '');
      this.href = this.basicService.getValue(this.inputData.href, '/');
      this.selected = this.basicService.getValue(this.inputData.selected, false);
      this.clickEventData = this.basicService.getValue(this.inputData.clickEventData, {});
   }

   render() {
      return html`
         <button class="${this.clazz} ${this.selected ? 'selected' : ''}" @click="${this.clicked}">
            <component-icon .inputData="${this.icon}"></component-icon>
            <component-typography clazz="ellipsis centerText" text="${this.text}"></component-typography>
            <slot></slot>
         </button>
      `;
   }

   async clicked() {
      this.dispatchSimpleCustomEvent(ButtonComponent.EVENT_CLICK, this.clickEventData);
   }

   getOutputData(): any {
      return undefined;
   }

   getEventList(): string[] {
      return [ButtonComponent.EVENT_CLICK];
   }
}
