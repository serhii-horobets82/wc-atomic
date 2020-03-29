import {css, html, property, query, TemplateResult, unsafeCSS} from 'lit-element';

import {AbstractComponent, AbstractInputData} from '../abstract-component/component';
import {IconInputData} from '../icon/component';
import { BasicService } from '@domoskanonos/frontend-basis';


const componentCSS = require('./component.css');

export class BasisTemplateInputData extends AbstractInputData {
}

export abstract class BasisTemplate extends AbstractComponent<BasisTemplateInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'DefaultTemplate';

   @property()
   menuSwitchIcon = 'menu';

   @property()
   menuCss: string = 'menuClosed basicShadow';

   @query('#top')
   private topElement: HTMLElement | undefined;
   @query('#left')
   private leftElement: HTMLElement | undefined;
   @query('#main')
   private mainElement: HTMLElement | undefined;

   render() {
      return html`
         <div class="container" @component-icon-click="${this.menuItemClicked}">
            <top id="top" class="${this.menuCss}">
               ${this.getTopContent()}
            </top>
            <div id="left" class="${this.menuCss}">
               ${this.getLeftComponent()}
            </div>
            <div id="main" class="${this.menuCss}">
               ${this.getMainComponent()}
            </div>
         </div>
      `;
   }

   abstract getMainComponent(): TemplateResult;

   abstract getLeftComponent(): TemplateResult;

   abstract getTopContent(): TemplateResult;

   protected inputDataChanged(): void {
   }

   public getOutputData(): undefined {
      return undefined;
   }

   getDefaultInputData(): BasisTemplateInputData {
      return <BasisTemplateInputData>{
         componentIdentifier: BasisTemplate.IDENTIFIER,
      };
   }

   menuItemClicked(event: CustomEvent) {
      let id: IconInputData = event.detail;
      if (BasicService.getUniqueInstance().isEqual(id.icon, this.menuSwitchIcon)) {
         console.log('menuItemClicked...');
         this.toogleMenu();
      }
   }

   private toogleMenu(): void {
      if (this.menuCss.indexOf('menuClosed') == -1) {
         this.menuCss = 'menuClosed basicShadow';
      } else {
         this.menuCss = 'basicShadow';
      }

   }

}
