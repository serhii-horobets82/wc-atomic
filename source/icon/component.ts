import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { BasicService } from '@domoskanonos/frontend-basis';
import { ElementState } from '..';

const componentCSS = require('./component.css');

export class IconInputData extends AbstractInputData {
   componentIdentifier = IconComponent.IDENTIFIER;
   icon: string = '';
   size: number = 24;
   sizeUnit: string = 'px';
   withIconSpace: boolean = true;
   title: string = '';
   color: string = '';
   clazz: string = '';
   clickable: boolean = false;
   clickData?: any;
   elementState: string = ElementState.ACTIVE_UNFOCUSED;
   rendered: boolean = true;
}

export class EventIconClickData {
   icon: string = '';
   clickData?: any;
   clickable: boolean = false;
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
   clazz: string = new IconInputData().clazz;

   @property()
   size: number = new IconInputData().size;

   @property()
   sizeUnit: string = new IconInputData().sizeUnit;

   @property()
   withIconSpace: boolean = new IconInputData().withIconSpace;

   @property()
   title: string = new IconInputData().title;

   @property()
   clickable: boolean = new IconInputData().clickable;

   @property()
   clickData: any;

   @property()
   elementState: string = new IconInputData().elementState;

   @property()
   rendered: boolean = new IconInputData().rendered;

   render() {
      return this.rendered
         ? html`
              <span
                 class="icon-container ${this.clazz} ${this.clickable ? 'clickable' : ''}"
                 title="${this.title}"
                 @click="${this.clicked}"
                 style="${this.withIconSpace && this.size != undefined
              ? 'height:'
                  .concat((this.size * 2).toString())
                  .concat('px;')
                  .concat('width:')
                  .concat((this.size * 2).toString())
                  .concat('px;')
              : ''}"
                 ><i
                    class="material-icons ${this.elementState}"
                    style="${this.color.length > 0 ? 'color: '.concat(this.color).concat(';') : ''} ${this.size != undefined
              ? 'font-size: ' + this.size.toString().concat(this.sizeUnit.concat(';'))
              : ''}"
                    >${this.convertNumeric(this.icon)}</i
                 >
              </span>
           `
         : html``;
   }

   inputDataChanged() {
      let defaultData = new IconInputData();
      this.icon = BasicService.getUniqueInstance().getValue(this.inputData.icon, defaultData.icon);
      this.size = BasicService.getUniqueInstance().getValue(this.inputData.size, defaultData.size);
      this.sizeUnit = BasicService.getUniqueInstance().getValue(this.inputData.sizeUnit, defaultData.sizeUnit);
      this.withIconSpace = BasicService.getUniqueInstance().getValue(this.inputData.withIconSpace, defaultData.withIconSpace);
      this.title = BasicService.getUniqueInstance().getValue(this.inputData.title, defaultData.title);
      this.color = BasicService.getUniqueInstance().getValue(this.inputData.color, defaultData.color);
      this.clazz = BasicService.getUniqueInstance().getValue(this.inputData.color, defaultData.clazz);
      this.clickable = BasicService.getUniqueInstance().getValue(this.inputData.clickable, defaultData.clickable);
      this.clickData = BasicService.getUniqueInstance().getValue(this.inputData.clickData, defaultData.clickData);
      this.elementState = BasicService.getUniqueInstance().getValue(this.inputData.elementState, defaultData.elementState);
      this.rendered = BasicService.getUniqueInstance().getValue(this.inputData.rendered, defaultData.rendered);
   }

   getOutputData(): any {
      return this.clickData;
   }

   getEventList(): string[] {
      return [IconComponent.EVENT_CLICK];
   }

   async clicked() {
      if (this.clickable) {
         this.dispatchSimpleCustomEvent(IconComponent.EVENT_CLICK, <EventIconClickData>{
            clickData: this.clickData,
            clickable: this.clickable,
            icon: this.icon
         });
      }
   }

   private convertNumeric(icon: string) {
      //TODO: ALLE ICONS REIN: https://stackoverflow.com/questions/49212903/materialize-icons-doesnt-work-in-javafx-browser
      let numericValues: any = {};
      numericValues['add'] = "&#xE145;";
      let numericValue: string = numericValues[icon];
      return numericValue != undefined ? numericValue : icon;
   }
}
