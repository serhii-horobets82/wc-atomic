import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../abstract/component/component';
import {TextInputData} from "./model";

const componentCSS = require('./component.css');

@customElement('component-text')
export class TextComponent extends AbstractComponent<TextInputData, any> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'TextComponent';

   @property()
   text: string = '';

   @property()
   clazz: string = '';

   @property()
   cssStyle: string = '';

   render() {
      return html`
         <span class="${this.clazz}" style="${this.cssStyle}"
            >${this.text}</span
         >
      `;
   }

   getDefaultInputData(): TextInputData {
      return <TextInputData>{
         componentIdentifier: TextComponent.IDENTIFIER,
         text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
      };
   }

   getOutputData(): any {
      return undefined;
   }

   protected inputDataChanged() {
      this.text = this.inputData.text !== undefined ? this.inputData.text : '';
      this.cssStyle =
         this.inputData.cssStyle !== undefined ? this.inputData.cssStyle : '';
      this.clazz =
         this.inputData.clazz !== undefined ? this.inputData.clazz : '';
   }
}
