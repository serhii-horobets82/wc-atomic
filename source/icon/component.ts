import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { BasicService } from '@domoskanonos/frontend-basis';

const componentCSS = require('./component.css');

export class IconState {
   static ACTIVE_FOCUSED: string = 'active-focused';
   static INACTIVE: string = 'inactive';
   static ACTIVE_UNFOCUSED: string = 'active';
}

export class IconInputData extends AbstractInputData {
   componentIdentifier = IconComponent.IDENTIFIER;
   icon: string = '';
   iconSize: number = 24;
   withIconSpace: boolean = true;
   title: string = '';
   color: string = '';
   clickable: boolean = false;
   clickData?: any;
   iconState: string = IconState.ACTIVE_UNFOCUSED;
   rendered: boolean = true;
}

@customElement('component-icon')
export class IconComponent extends AbstractComponent<IconInputData, any> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'IconComponent';

   static EVENT_CLICK: string = 'component-icon-click';

   @property()
   icon: string = new IconInputData().icon;

   @property()
   color: string = new IconInputData().color;

   @property()
   iconSize: number = new IconInputData().iconSize;

   @property()
   withIconSpace: boolean = new IconInputData().withIconSpace;

   @property()
   title: string = new IconInputData().title;

   @property()
   clickable: boolean = new IconInputData().clickable;

   @property()
   clickData: any;

   @property()
   iconState: string = new IconInputData().iconState;

   @property()
   rendered: boolean = new IconInputData().rendered;

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

   inputDataChanged() {
      let defaultData = new IconInputData();
      this.icon = BasicService.getInstance().getValue(this.inputData.icon, defaultData.icon);
      this.iconSize = BasicService.getInstance().getValue(this.inputData.iconSize, defaultData.iconSize);
      this.withIconSpace = BasicService.getInstance().getValue(this.inputData.withIconSpace, defaultData.withIconSpace);
      this.title = BasicService.getInstance().getValue(this.inputData.title, defaultData.title);
      this.color = BasicService.getInstance().getValue(this.inputData.color, defaultData.color);
      this.clickable = BasicService.getInstance().getValue(this.inputData.clickable, defaultData.clickable);
      this.clickData = BasicService.getInstance().getValue(this.inputData.clickData, defaultData.clickData);
      this.iconState = BasicService.getInstance().getValue(this.inputData.iconState, defaultData.iconState);
      this.rendered = BasicService.getInstance().getValue(this.inputData.rendered, defaultData.rendered);
   }

   getOutputData(): any {
      return this.clickData;
   }

   getEventList(): string[] {
      return [IconComponent.EVENT_CLICK];
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

}
