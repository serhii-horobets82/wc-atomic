import { css, html, property, query, TemplateResult, unsafeCSS } from 'lit-element';
import { DataProtection } from '../data-protection/component';

import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { IconInputData } from '../icon/component';

const componentCSS = require('./component.css');

export class BasisTemplateInputData extends AbstractInputData {
   title?: string;
}

export abstract class BasisTemplate extends AbstractComponent<BasisTemplateInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'DefaultTemplate';

   @property()
   title = '';

   @property()
   menuSwitchIconClazz = 'fas fa-bars';

   @query('#top')
   private topElement: HTMLElement | undefined;
   @query('#left')
   private leftElement: HTMLElement | undefined;
   //@query('#main')
   //private mainElement: HTMLElement | undefined;

   menuCss: string = '';

   render() {
      return html`
         <div class="container" @component-icon-click="${this.menuItemClicked}">
            <top id="top" class="basicShadow">
               ${this.getTopContent()}
            </top>
            <div id="left" class="basicShadow">
               ${this.getLeftComponent()}
            </div>
            <div id="main">
               ${this.getMainComponent()}
            </div>
         </div>
         <component-data-protection .inputData="${new DataProtection().getDefaultInputData()}"></component-data-protection>
      `;
   }

   abstract getMainComponent(): TemplateResult;

   abstract getLeftComponent(): TemplateResult;

   abstract getTopContent(): TemplateResult;

   protected inputDataChanged(): void {
      this.title = this.basicService.getValue(this.inputData.title, '');
   }

   public getOutputData(): undefined {
      return undefined;
   }

   getDefaultInputData(): BasisTemplateInputData {
      return <BasisTemplateInputData>{
         componentIdentifier: BasisTemplate.IDENTIFIER,
         title: ''
      };
   }

   menuItemClicked(event: CustomEvent) {
      let iid: IconInputData = event.detail;
      if (this.basicService.isEqual(iid.iconClazz, this.menuSwitchIconClazz)) {
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

      //if (this.mainElement != undefined) this.mainElement.setAttribute('class', this.menuCss);
      if (this.leftElement != undefined) this.leftElement.setAttribute('class', this.menuCss);
      if (this.topElement != undefined) this.topElement.setAttribute('class', this.menuCss);
   }
}
