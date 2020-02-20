import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { BasicService } from '@domoskanonos/frontend-basis';

const componentCSS = require('./component.css');

export class RichMediaInputData extends AbstractInputData {
   src: string = '';
   clazz: string = 'imageWidthHundred';
   text: string = '';
   cssStyle: string = '';
}

export class RichMediaType extends AbstractInputData {
   static IMG: string = 'IMG';
   static MOVIE: string = 'MOVIE';
}


@customElement('component-rich-media')
export class RichMediaComponent extends AbstractComponent<RichMediaInputData, undefined> {
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

   @property()
   rendered: boolean = true;

   getDefaultInputData(): RichMediaInputData {
      return <RichMediaInputData>{
         componentIdentifier: RichMediaComponent.IDENTIFIER,
         src: 'https://picsum.photos/300/300',
         clazz: 'imageWidthHundred',
         text: ''
      };
   }

   protected inputDataChanged() {
      this.src = BasicService.getUniqueInstance().getValue(this.inputData.src, '');
      this.text = BasicService.getUniqueInstance().getValue(this.inputData.text, '');
      this.cssStyle = BasicService.getUniqueInstance().getValue(this.inputData.cssStyle, '');
      this.clazz = BasicService.getUniqueInstance().getValue(this.inputData.clazz, '');
   }

   render() {
      return this.rendered ? html`<span class="${this.clazz}"><img src="${this.src}" style="${this.cssStyle}"/></span>` : html``;
   }

   getOutputData(): undefined {
      return undefined;
   }
}
