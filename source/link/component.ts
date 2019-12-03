import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import {TypographyTypes} from "../a";

const componentCSS = require('./component.css');

export class LinkInputData extends AbstractInputData {
   text?: string = '';
   target?: string = '';
   href?: string = '';
}

@customElement('component-link')
export class LinkComponent extends AbstractComponent<LinkInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'LinkComponent';

   @property()
   href: string = '';

   @property()
   target: string = '_blank';

   @property()
   text: string = '';

   render() {
      return html`
         <a href="${this.href}" target="${this.target}"><component-typography .type="${TypographyTypes.BUTTON}">${this.text}<slot></slot></component-typography></a>
      `;
   }

   protected inputDataChanged() {
      this.href = this.basicService.getValue(this.inputData.href, '');
      this.target = this.basicService.getValue(this.inputData.target, '');
      this.text = this.basicService.getValue(this.inputData.text, '');
   }

   getDefaultInputData(): LinkInputData {
      return <LinkInputData>{ componentIdentifier: LinkComponent.IDENTIFIER, text: 'Home', href: '/' };
   }

   getOutputData(): undefined {
      return undefined;
   }
}
