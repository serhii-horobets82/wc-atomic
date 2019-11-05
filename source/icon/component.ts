import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';

const componentCSS = require('./component.scss');

/**
 * iconClazz:
 * clazzName for the icon
 *
 * clickable:
 * if true, mouse is cursor type pointer and a event is pushed.
 *
 * status:
 * 1 = normal
 * 2 = aktiv
 * 3 = passiv
 */
export class IconInputData extends AbstractInputData {
   iconClazz?: string;
   cssStyle?: string;
   clickable?: boolean;
   status?: number;
}

@customElement('component-icon')
export class IconComponent extends AbstractComponent<IconInputData, any> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'IconComponent';

   static EVENT_CLICK: string = 'component-icon-click';

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

   render() {
      return html`
         <span
            title="${this.title}"
            class="${this.iconClazz} ${this.clickable ? 'clickable' : ''} ${this.status === 2
               ? 'active'
               : this.status === 3
               ? 'passiv'
               : ''}"
            @click="${this.clicked}"
         ></span>
      `;
   }

   async clicked() {
      if (this.clickable) {
         this.dispatchSimpleCustomEvent(IconComponent.EVENT_CLICK, {
            status: this.status,
            clickable: this.clickable,
            iconClazz: this.iconClazz
         });
      }
   }

   getDefaultInputData(): IconInputData {
      return <IconInputData>{
         componentIdentifier: IconComponent.IDENTIFIER,
         iconClazz: 'fas fa-question',
         clickable: true,
         status: 1
      };
   }

   inputDataChanged() {
      this.iconClazz = this.basicService.getValue(this.inputData.iconClazz, '');
      this.cssStyle = this.basicService.getValue(this.inputData.cssStyle, '');
      this.status = this.basicService.getValue(this.inputData.status, 1);
      this.clickable = this.basicService.getValue(this.inputData.clickable, false);
   }

   getOutputData(): any {
      return undefined;
   }

   getEventList(): string[] {
      return [IconComponent.EVENT_CLICK];
   }
}
