import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import {TypographyType} from "..";
import { BasicService } from '@domoskanonos/frontend-basis';

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
         <a href="${this.href}" target="${this.target}"><component-typography .type="${TypographyType.BUTTON}">${this.text}<slot></slot></component-typography></a>
      `;
   }

   protected inputDataChanged() {
      this.href = BasicService.getInstance().getValue(this.inputData.href, '');
      this.target = BasicService.getInstance().getValue(this.inputData.target, '');
      this.text = BasicService.getInstance().getValue(this.inputData.text, '');
   }

   getDefaultInputData(): LinkInputData {
      return <LinkInputData>{ componentIdentifier: LinkComponent.IDENTIFIER, text: 'Home', href: '/' };
   }

   getOutputData(): undefined {
      return undefined;
   }
}
