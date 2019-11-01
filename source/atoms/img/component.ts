import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../abstract-component/component';
import {ImgModel} from "./model";

const componentCSS = require('./component.css');

@customElement('component-img')
export class ImgComponent extends AbstractComponent<ImgModel, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'ImgComponent';

   @property()
   src: string = '';

   @property()
   clazz: string = '';

   @property()
   cssStyle: string = '';

   @property()
   text: string = '';

   getDefaultInputData(): ImgModel {
      return <ImgModel>{
         componentIdentifier: ImgComponent.IDENTIFIER,
         src: 'https://picsum.photos/300/300',
         clazz: 'imageWidthHundred',
         text: ''
      };
   }

   protected inputDataChanged() {
      this.src = this.basicService.getValue(this.inputData.src, '')
      this.text = this.basicService.getValue(this.inputData.text, '')
      this.cssStyle = this.basicService.getValue(this.inputData.cssStyle, '')
      this.clazz = this.basicService.getValue(this.inputData.clazz, '')
   }

   render() {
      return html`
         <span class="${this.clazz}" ><img src="${this.src}" style="${this.cssStyle}"/></span
         >${this.text}
      `;
   }

   getOutputData(): undefined {
      return undefined;
   }
}
