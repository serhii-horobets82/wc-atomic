import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { guard } from 'lit-html/directives/guard';
import { RichMediaComponent, RichMediaInputData } from '../rich-media/component';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';

const componentCSS = require('./component.css');

/**
 *
 * maxHeight:
 * limit the size of the slider,
 * if horizontal is maxHeight = maxWidth,
 * if vertical is maxHeight = maxHeight
 *
 * sliderType:
 * 1 = Horizontal
 * 2 = Vertical
 */
export class ImgSliderInputData extends AbstractInputData {
   sliderType?: number;
   maxSize?: string;
   imgs?: RichMediaInputData[];
}

@customElement('component-rich-media-slider')
export class ImgSliderComponent extends AbstractComponent<ImgSliderInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'ImgSliderComponent';

   static EVENT_CLICK: string = 'component-rich-media-slider-click';

   @property()
   imgs: RichMediaInputData[] = [];

   @property()
   maxSize: string = '250px';

   @property()
   sliderType: number = 1;

   render() {
      return html`
         <div
            class="imgSlider ${this.sliderType == 1 ? 'horizontal' : 'vertical'}"
            style="${this.sliderType == 1 ? 'max-width' : 'max-height'}:${this.maxSize}"
         >
            ${guard(
               this.imgs,
               () =>
                  html`
                     ${repeat(
                        this.imgs,
                        (item) => html`
                           <component-rich-media
                              clazz="${item.clazz} ${this.sliderType == 1 ? 'imageHeightHundred' : 'imageWidthHundred'}"
                              src="${item.src}"
                              @click="${() => this.clicked(item)}"
                           ></component-rich-media>
                        `
                     )}
                  `
            )}
         </div>
      `;
   }

   inputDataChanged(): void {
      this.imgs = this.basicService.getValue(this.inputData.imgs, []);
      this.sliderType = this.basicService.getValue(this.inputData.sliderType, 1);
      this.maxSize = this.basicService.getValue(this.inputData.maxSize, 1);
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
            <RichMediaInputData>{
               componentIdentifier: RichMediaComponent.IDENTIFIER,
               clazz: '',
               src: 'https://picsum.photos/350/350'
            },
            <RichMediaInputData>{
               componentIdentifier: RichMediaComponent.IDENTIFIER,
               clazz: '',
               src: 'https://picsum.photos/450/450'
            },
            <RichMediaInputData>{
               componentIdentifier: RichMediaComponent.IDENTIFIER,
               clazz: '',
               src: 'https://picsum.photos/550/550'
            },
            <RichMediaInputData>{
               componentIdentifier: RichMediaComponent.IDENTIFIER,
               clazz: '',
               src: 'https://picsum.photos/300/300'
            },
            <RichMediaInputData>{
               componentIdentifier: RichMediaComponent.IDENTIFIER,
               clazz: '',
               src: 'https://picsum.photos/400/400'
            },
            <RichMediaInputData>{
               componentIdentifier: RichMediaComponent.IDENTIFIER,
               clazz: '',
               src: 'https://picsum.photos/500/500'
            },
            <RichMediaInputData>{
               componentIdentifier: RichMediaComponent.IDENTIFIER,
               clazz: '',
               src: 'https://picsum.photos/500/500'
            },
            <RichMediaInputData>{
               componentIdentifier: RichMediaComponent.IDENTIFIER,
               clazz: '',
               src: 'https://picsum.photos/500/500'
            },
            <RichMediaInputData>{
               componentIdentifier: RichMediaComponent.IDENTIFIER,
               clazz: '',
               src: 'https://picsum.photos/500/500'
            },
            <RichMediaInputData>{
               componentIdentifier: RichMediaComponent.IDENTIFIER,
               clazz: '',
               src: 'https://picsum.photos/500/500'
            },
            <RichMediaInputData>{
               componentIdentifier: RichMediaComponent.IDENTIFIER,
               clazz: '',
               src: 'https://picsum.photos/600/600'
            }
         ]
      };
   }

   private clicked(item: RichMediaInputData) {
      this.dispatchSimpleCustomEvent(ImgSliderComponent.EVENT_CLICK, item);
   }
}
