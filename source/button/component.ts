import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { IconInputData } from '../icon/component';
import { SpacerAlignment, SpacerSize } from '..';
import { BasicService } from '@domoskanonos/frontend-basis';

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
   icon: string = '';

   @property()
   clazz: string = '';

   @property()
   text: string = '';

   @property()
   href: string = '';

   @property()
   selected: boolean = false;

   @property()
   disabled: boolean = false;

   @property()
   clickEventData: any = {};

   protected inputDataChanged() {
      this.icon = BasicService.getUniqueInstance().getValue(this.inputData.icon, <IconInputData>{});
      this.text = BasicService.getUniqueInstance().getValue(this.inputData.text, '');
      this.href = BasicService.getUniqueInstance().getValue(this.inputData.href, '/');
      this.selected = BasicService.getUniqueInstance().getValue(this.inputData.selected, false);
      this.clickEventData = BasicService.getUniqueInstance().getValue(this.inputData.clickEventData, {});
   }

   render() {
      return html`
         <effect-ripple>
            <button class=" ${this.selected ? 'selected' : ''} ${this.disabled ? 'disabled' : ''}" @click="${this.clicked}">
               <component-spacer spacerSize="${SpacerSize.MEDIUM}" spacerAlignment="${SpacerAlignment.HORIZONTAL}">
                  <component-icon
                     icon="${this.icon}"
                     .rendered="${this.icon != undefined}"
                     .withIconSpace="${false}"
                  ></component-icon>
                  <component-typography clazz="ellipsis centerText" text="${this.text}"></component-typography
               ></component-spacer>
               <slot></slot>
            </button>
         </effect-ripple>
      `;
   }

   async clicked() {
      if (!this.disabled) {
         this.dispatchSimpleCustomEvent(ButtonComponent.EVENT_CLICK, this.clickEventData);
      }
   }

   getOutputData(): any {
      return undefined;
   }

   getEventList(): string[] {
      return [ButtonComponent.EVENT_CLICK];
   }
}
