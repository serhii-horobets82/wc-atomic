import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';

const componentCSS = require('./component.css');

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
   componentIdentifier = IconComponent.IDENTIFIER;
   icon?: string;
   cssStyle?: string;
   clickable?: boolean;
   clickData?: any;
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
   icon: string = '';

   @property()
   cssStyle: string = '';

   @property()
   title: string = '';

   @property()
   clickable: boolean = false;

   @property()
   clickData: any;

   @property()
   status: number = 1;

   @property()
   rendered: boolean = true;

   render() {
      return html`
         <span class="icon-container ${!this.rendered ? 'hide' : ''}">
            <span
               title="${this.title}"
               class="${this.clickable ? 'clickable' : ''} ${this.status === 2 ? 'active' : this.status === 3 ? 'passiv' : ''}"
               @click="${this.clicked}"
               ><i class="material-icons">${this.icon}</i></span
            >
         </span>
      `;
   }

   async clicked() {
      if (this.clickable) {
         this.dispatchSimpleCustomEvent(IconComponent.EVENT_CLICK, {
            status: this.status,
            clickData: this.clickData,
            clickable: this.clickable,
            icon: this.icon
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
      this.clickData = this.basicService.getValue(this.inputData.clickData, undefined);
      this.icon = this.basicService.getValue(this.inputData.icon, '');
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
