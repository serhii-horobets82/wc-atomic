import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { NavigationComponent } from '../navigation/component';
import { ComponentLoader } from '../abstract/component-loader';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { BasicService } from '@domoskanonos/frontend-basis';

const componentCSS = require('./component.css');

export class ContentSliderInputData extends AbstractInputData {
   open: boolean = false;
   componentInputData?: AbstractInputData;
}

@customElement('component-content-slider')
export class ContentSliderComponent extends AbstractComponent<ContentSliderInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   @property()
   open: boolean = true;

   @property()
   componentInputData: AbstractInputData = <AbstractInputData>{};

   static IDENTIFIER: string = 'ContentSliderComponent';

   static EVENT_CONTENT_SLIDER_CLICK: string = 'component-content-slider-click';

   render() {
      return html`
         <div @component-icon-click="${this.iconClicked}">
            <div class="header ${this.open ? '' : 'closed'}">
               <component-icon
                  iconClazz="${this.open ? 'fas fa-angle-left' : 'fas fa-angle-right'}"
                  clickable="true"
               ></component-icon>
            </div>
            <div class="content ${this.open ? '' : 'closed'}">
               ${ComponentLoader.getUniqueInstance().createComponentFromInputData(this.componentInputData)}
            </div>
         </div>
      `;
   }

   iconClicked(event: CustomEvent) {
      console.log('content slider current state, open= ' + this.open);
      this.open = !this.open;

      let contentSliderData: any = {
         open: this.open
      };

      console.log('content slider new state, open= ' + this.open);

      this.dispatchCompoundCustomEvent(ContentSliderComponent.EVENT_CONTENT_SLIDER_CLICK, event, contentSliderData);
   }

   getDefaultInputData(): ContentSliderInputData {
      return <ContentSliderInputData>{
         componentIdentifier: ContentSliderComponent.IDENTIFIER,
         open: true,
         componentInputData: new NavigationComponent().getDefaultInputData()
      };
   }

   protected inputDataChanged(): void {
      this.open = this.inputData.open;
      this.componentInputData = BasicService.getUniqueInstance().getValue(this.inputData.componentInputData, AbstractInputData.prototype);
   }

   getOutputData(): undefined {
      return undefined;
   }
}
