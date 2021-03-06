import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { TypographyInputData, TypographyType } from '..';
import { BasicService } from '@domoskanonos/frontend-basis';
import { EventIconClickData } from '../icon/component';

const componentCSS = require('./component.css');

export class LinkInputData extends AbstractInputData {
   text?: string = '';
   target?: string = '';
   href?: string = '';
}

export class TargetType {
   static BLANK: string = '_blank';
   static SELF: string = '_self';
   static PARENT: string = '_parent';
   static TOP: string = '_top';
}

@customElement('component-link')
export class LinkComponent extends AbstractComponent<LinkInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'LinkComponent';

   static EVENT_CLICK: string = 'component-link-click';

   @property()
   href: string = '';

   @property()
   target: string = TargetType.SELF;

   @property()
   text: string = '';

   render() {
      return BasicService.getUniqueInstance().isNotBlank(this.href)
         ? html`
              <a href="${this.href}" target="${this.target}"
                 ><component-typography .typographyType="${TypographyType.BUTTON}">${this.text}<slot></slot></component-typography
              ></a>
           `
         : html`
              <span style="cursor:pointer;">${this.text}</span>
           `;
   }

   protected inputDataChanged() {
      let defaultData: LinkInputData = new LinkInputData();
      this.href = BasicService.getUniqueInstance().getValue(this.inputData.href, defaultData.href);
      this.target = BasicService.getUniqueInstance().getValue(this.inputData.target, defaultData.target);
      this.text = BasicService.getUniqueInstance().getValue(this.inputData.text, defaultData.text);
   }

   getOutputData(): undefined {
      return undefined;
   }
}
