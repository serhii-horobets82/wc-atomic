import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent } from '../../abstract/component/component';
import { ImgSliderComponent } from '../img-slider/component';
import {ImgModel} from "../../atoms/img/model";
import {ImgSliderSelectorInputData} from "./model";

const componentCSS = require('./component.css');

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
   sliderType: number;

   @property()
   maxHeight: string;

   @property()
   imgs: ImgModel[] = [];

   @property()
   selectedImg: ImgModel;

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
      this.imgs = this.inputData.imgSlider.imgs;
      if (this.imgs !== undefined && this.imgs.length > 0) {
         this.selectedImg = this.inputData.imgSlider.imgs[0];
      }
      this.maxHeight = this.inputData.imgSlider.maxSize;
      this.sliderType = this.inputData.imgSlider.sliderType;
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
      let img: ImgModel = <ImgModel>event.detail;
      this.selectedImg = img;
   }
}
