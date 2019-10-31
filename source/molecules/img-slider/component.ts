import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { guard } from 'lit-html/directives/guard';
import { ImgComponent} from '../../atoms/img/component';
import { AbstractComponent } from '../../abstract-component/component';
import {ImgModel} from "../../atoms/img/model";
import {ImgSliderInputData} from "./model";

const componentCSS = require('./component.css');

@customElement('component-img-slider')
export class ImgSliderComponent extends AbstractComponent<
   ImgSliderInputData,
   undefined
> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'ImgSliderComponent';

   static EVENT_CLICK: string = 'component-img-slider-click';

   @property()
   imgs: ImgModel[] = [];

   @property()
   maxSize: string = '250px';

   @property()
   sliderType: number = 1;

   render() {
      return html`
         <div
            class="imgSlider ${this.sliderType == 1
               ? 'horizontal'
               : 'vertical'}"
            style="${this.sliderType == 1 ? 'max-width' : 'max-height'}:${this
               .maxSize}"
         >
            ${guard(
               this.imgs,
               () =>
                  html`
                     ${repeat(
                        this.imgs,
                        (item) => html`
                           <component-img
                              clazz="${item.clazz} ${this.sliderType == 1
                                 ? 'imageHeightHundred'
                                 : 'imageWidthHundred'}"
                              src="${item.src}"
                              @click="${() => this.clicked(item)}"
                           ></component-img>
                        `
                     )}
                  `
            )}
         </div>
      `;
   }

   inputDataChanged(): void {
      this.imgs = this.inputData.imgs;
      this.sliderType = this.inputData.sliderType;
      this.maxSize = this.inputData.maxSize;
   }

   getOutputData(): undefined {
      return undefined;
   }

   getDefaultInputData(): ImgSliderInputData {
      return <ImgSliderInputData>{
         componentIdentifier: ImgSliderComponent.IDENTIFIER,
         maxSize: '500px',
         sliderType: 2,
         imgs: [
            <ImgModel>{
               componentIdentifier: ImgComponent.IDENTIFIER,
               clazz: '',
               src: 'https://picsum.photos/350/350'
            },
            <ImgModel>{
               componentIdentifier: ImgComponent.IDENTIFIER,
               clazz: '',
               src: 'https://picsum.photos/450/450'
            },
            <ImgModel>{
               componentIdentifier: ImgComponent.IDENTIFIER,
               clazz: '',
               src: 'https://picsum.photos/550/550'
            },
            <ImgModel>{
               componentIdentifier: ImgComponent.IDENTIFIER,
               clazz: '',
               src: 'https://picsum.photos/300/300'
            },
            <ImgModel>{
               componentIdentifier: ImgComponent.IDENTIFIER,
               clazz: '',
               src: 'https://picsum.photos/400/400'
            },
            <ImgModel>{
               componentIdentifier: ImgComponent.IDENTIFIER,
               clazz: '',
               src: 'https://picsum.photos/500/500'
            },
            <ImgModel>{
               componentIdentifier: ImgComponent.IDENTIFIER,
               clazz: '',
               src: 'https://picsum.photos/500/500'
            },
            <ImgModel>{
               componentIdentifier: ImgComponent.IDENTIFIER,
               clazz: '',
               src: 'https://picsum.photos/500/500'
            },
            <ImgModel>{
               componentIdentifier: ImgComponent.IDENTIFIER,
               clazz: '',
               src: 'https://picsum.photos/500/500'
            },
            <ImgModel>{
               componentIdentifier: ImgComponent.IDENTIFIER,
               clazz: '',
               src: 'https://picsum.photos/500/500'
            },
            <ImgModel>{
               componentIdentifier: ImgComponent.IDENTIFIER,
               clazz: '',
               src: 'https://picsum.photos/600/600'
            }
         ]
      };
   }

   private clicked(item: ImgModel) {
      this.dispatchSimpleCustomEvent(ImgSliderComponent.EVENT_CLICK, item);
   }
}
