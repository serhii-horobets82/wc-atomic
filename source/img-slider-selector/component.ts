import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from '../abstract-component/component';
import {ImgSliderComponent, ImgSliderInputData} from '../img-slider/component';
import {ImgInputData} from "../img/component";

const componentCSS = require('./component.css');

export class ImgSliderSelectorInputData extends AbstractInputData {
   columnFlexBasisValues?: string[];
   imgSlider?: ImgSliderInputData;
}

@customElement('component-img-slider-selector')
export class ImgSliderSelectorComponent extends AbstractComponent<
   ImgSliderSelectorInputData,
   undefined
> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'ImgSliderSelectorComponent';

   @property()
   sliderType: number = 1;

   @property()
   maxHeight: string = '';

   @property()
   imgs: ImgInputData[] = [];

   @property()
   selectedImg: ImgInputData = <ImgInputData>{};

   @property()
   columnFlexBasisValues: string[] = ['30%', '70%'];

   render() {
      return html`
         <div
            @component-img-slider-click="${this.sliderItemClicked}"
            class="sliderSelector"
            style="height: ${this.maxHeight};"
         >
            <component-img-slider
               style="flex-basis: ${this.imgs.length > 1
                  ? this.columnFlexBasisValues[0]
                  : '0%'}"
               maxSize="${this.maxHeight}"
               sliderType="${this.sliderType}"
               .imgs="${this.imgs}"
            ></component-img-slider>

            <component-img
               .inputData="${this.selectedImg}"
               style="flex-basis: ${this.imgs.length > 1
                  ? this.columnFlexBasisValues[1]
                  : 'auto'}"
            ></component-img>
         </div>
      `;
   }

   inputDataChanged() {
      if (this.inputData.imgSlider != undefined) {
         this.maxHeight = this.basicService.getValue(this.inputData.imgSlider.maxSize, 1);
         this.sliderType = this.basicService.getValue(this.inputData.imgSlider.sliderType, 1);
         this.imgs = this.basicService.getValue(this.inputData.imgSlider.imgs, []);
         if (this.imgs !== undefined && this.imgs.length > 0) {
            this.selectedImg = this.basicService.getValue(this.imgs[0], new ImgInputData());
         }
      }
   }

   getDefaultInputData(): ImgSliderSelectorInputData {
      return <ImgSliderSelectorInputData>{
         componentIdentifier: ImgSliderSelectorComponent.IDENTIFIER,
         imgSlider: new ImgSliderComponent().getDefaultInputData()
      };
   }

   getOutputData(): undefined {
      return undefined;
   }

   sliderItemClicked(event: CustomEvent) {
      let img: ImgInputData = <ImgInputData>event.detail;
      this.selectedImg = img;
   }
}
