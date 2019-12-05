import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from '../abstract-component/component';

const componentCSS = require('./component.css');

export class DialogInputData extends AbstractInputData {
   componentIdentifier = DialogComponent.IDENTIFIER;
   show: boolean = false;
}

@customElement('component-dialog')
export class DialogComponent extends AbstractComponent<DialogInputData, any> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'DialogComponent';

   @property()
   show: boolean = false;

   render() {
      return html`
         <div class="${!this.show ? 'hide' : ''} fullScreen opacScreen"></div>
         <div class="${!this.show ? 'hide' : ''} fullScreen wrapperOutside">
            <div class="wrapperInside">
               <!-- Dialog -->
               <div class="dialogContainer">
                  <slot></slot>
               </div>
            </div>
         </div>
      `;
   }

   getDefaultInputData(): DialogInputData {
      return DialogInputData.prototype;
   }

   inputDataChanged() {
      this.show = this.inputData.show;
   }

   getOutputData(): any {
      return undefined;
   }
}
