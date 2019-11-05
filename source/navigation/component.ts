import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { guard } from 'lit-html/directives/guard';
import { ComponentLoader } from '../abstract/component-loader';
import { repeat } from 'lit-html/directives/repeat';
import { RouterService } from '@domoskanonos/frontend-basis';
import { LinkInputData } from '../link/component';

const componentCSS = require('./component.css');

export class NavigationLinkInputData extends LinkInputData {
   icon?: string;
}

export class NavigationInputData extends AbstractInputData {
   clazz?: string;
   links?: NavigationLinkInputData[];
   contentBefore?: AbstractInputData[];
   contentAfter?: AbstractInputData[];
}

@customElement('component-navigation')
export class NavigationComponent extends AbstractComponent<NavigationInputData, any> {
   @property()
   clazz: string = '';

   @property()
   links: NavigationLinkInputData[] = [];

   @property()
   contentBefore: AbstractInputData[] = [];

   @property()
   contentAfter: AbstractInputData[] = [];

   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'NavigationComponent';

   getDefaultInputData(): NavigationInputData {
      return <NavigationInputData>{
         componentIdentifier: NavigationComponent.IDENTIFIER,
         links: [
            { text: 'Homepage', href: '#', icon: 'icon-home' },
            { text: 'Get started', href: '#get-started', icon: '' },
            { text: 'Form', href: '#form', icon: '' },
            { text: 'Media', href: '#media', icon: '' },
            { text: 'Komponenten', href: '#c', icon: '' },
            { text: 'Komplexe Komponenten', href: '#cc', icon: '' },
            { text: 'Dynamische Komponenten', href: '#dc', icon: '' }
         ]
      };
   }

   render() {
      return html`
         <div>
            ${guard(
               this.contentBefore,
               () =>
                  html`
                     ${repeat(
                        this.contentBefore,
                        (inputData) => html`
                           ${ComponentLoader.INSTANCE.createComponentFromInputData(inputData)}
                        `
                     )}
                  `
            )}
            <slot name="contentBefore"></slot>

            ${this.links.map(
               (linkItem) => html`
                  <div
                     @click="${() => this.clickedMenuItem(linkItem)}"
                     class="${RouterService.getInstance().getPath() == linkItem.href ? 'navItem selected' : 'navItem'}"
                  >
                     <component-icon iconClazz="${linkItem.icon}" class="navitemIcon"></component-icon>
                     <component-text>${linkItem.text}</component-text>
                  </div>
               `
            )}
            ${guard(
               this.contentAfter,
               () =>
                  html`
                     ${repeat(
                        this.contentAfter,
                        (inputData) => html`
                           ${ComponentLoader.INSTANCE.createComponentFromInputData(inputData)}
                        `
                     )}
                  `
            )}
            <slot name="contentAfter"></slot>
         </div>
      `;
   }

   protected inputDataChanged() {
      this.clazz = this.basicService.getValue(this.inputData.clazz, '');
      this.links = this.basicService.getValue(this.inputData.links, []);
      this.contentBefore = this.basicService.getValue(this.inputData.contentBefore, []);
      this.contentAfter = this.basicService.getValue(this.inputData.contentAfter, []);
   }

   getOutputData(): any {
      return undefined;
   }

   private clickedMenuItem(linkItem: NavigationLinkInputData) {
      RouterService.getInstance().navigate(linkItem.href);
   }
}
