import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';

const componentCSS = require('./component.css');

export class IconState {
   static DEFAULT: string = 'DEFAULT';
   static ACTIVE_FOCUSED: string = 'ACTIVE_FOCUSED';
   static INACTIVE: string = 'INACTIVE';
   static ACTIVE: string = 'ACTIVE';
}

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
   color: string = '';

   @property()
   iconSize: number = 24;

   @property()
   withIconSpace: boolean = true;

   @property()
   title: string = '';

   @property()
   clickable: boolean = false;

   @property()
   clickData: any;

   @property()
   iconState: string = IconState.DEFAULT;

   @property()
   rendered: boolean = true;

   render() {
      return this.rendered
         ? html`
              <span
                 class="icon-container ${this.clickable ? 'clickable' : ''}"
                 title="${this.title}"
                 @click="${this.clicked}"
                 style="${this.withIconSpace && this.iconSize != undefined
                    ? 'height:'
                         .concat((this.iconSize * 2).toString())
                         .concat('px;')
                         .concat('width:')
                         .concat((this.iconSize * 2).toString())
                         .concat('px;')
                    : ''}"
                 ><i
                    class="material-icons ${this.iconState}"
                    style="${this.color.length > 0 ? 'color: '.concat(this.color).concat(';') : ''} ${this.iconSize != undefined
                       ? 'font-size: ' + this.iconSize.toString().concat('px;')
                       : ''}"
                    >${this.icon}</i
                 >
              </span>
           `
         : html``;
   }

   async clicked() {
      if (this.clickable) {
         this.dispatchSimpleCustomEvent(IconComponent.EVENT_CLICK, {
            clickData: this.clickData,
            clickable: this.clickable,
            icon: this.icon
         });
      }
   }

   inputDataChanged() {
      this.clickData = this.basicService.getValue(this.inputData.clickData, undefined);
      this.icon = this.basicService.getValue(this.inputData.icon, '');
      this.clickable = this.basicService.getValue(this.inputData.clickable, false);
   }

   getOutputData(): any {
      return undefined;
   }

   getEventList(): string[] {
      return [IconComponent.EVENT_CLICK];
   }
}
