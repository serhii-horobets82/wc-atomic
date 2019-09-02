import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../abstract/abstract-component';
import {Text} from '../../interface/atoms';

const componentCSS = require('./component.css');

@customElement('component-text')
export class TextComponent extends AbstractComponent<Text, any> {
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

   getDefaultInputData(): Text {
      return <Text>{
         componentIdentifier: TextComponent.IDENTIFIER,
         text: 'Lorem Ipsum'
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
