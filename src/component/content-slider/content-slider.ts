import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {NavigationComponent} from '../navigation/navigation';
import {ComponentLoader} from '../../abstract/component-loader';
import {AbstractInputData, ContentSlider} from '../../interface/atoms';
import {AbstractComponent} from '../../abstract/abstract-component';

const componentCSS = require('./content-slider.scss');

@customElement('component-content-slider')
export class ContentSliderComponent extends AbstractComponent<
   ContentSlider,
   undefined
> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   @property()
   open: boolean;

   @property()
   componentInputData: AbstractInputData;

   static IDENTIFIER: string = 'ContentSliderComponent';

   static EVENT_CONTENT_SLIDER_CLICK: string = 'component-content-slider-click';

   render() {
      return html`
         <div @component-icon-click="${this.iconClicked}">
          <div class="header ${this.open ? '' : 'closed'}"> 
            <component-icon
               iconClazz="${
                  this.open ? 'fas fa-angle-left' : 'fas fa-angle-right'
               }"
               clickable="true"
            ></component-icon>
            </div>
            <div class="content ${this.open ? '' : 'closed'}">
               ${ComponentLoader.INSTANCE.createComponentFromInputData(
                  this.componentInputData
               )}
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

      this.dispatchCompoundCustomEvent(
         ContentSliderComponent.EVENT_CONTENT_SLIDER_CLICK,
         event,
         contentSliderData
      );
   }

   getDefaultInputData(): ContentSlider {
      return <ContentSlider>{
         componentIdentifier: ContentSliderComponent.IDENTIFIER,
         open: true,
         componentInputData: new NavigationComponent().getDefaultInputData()
      };
   }

   protected inputDataChanged(): void {
      this.open = this.inputData.open;
      this.componentInputData = this.inputData.componentInputData;
   }

   getOutputData(): undefined {
      return undefined;
   }
}
