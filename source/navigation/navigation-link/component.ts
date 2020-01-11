import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent } from '../../abstract-component/component';
import { LinkInputData } from '../../link/component';
import { RouterService } from '@domoskanonos/frontend-basis';

const componentCSS = require('./component.css');

export class NavigationLinkInputData extends LinkInputData {
   iconClazz?: string;
}

@customElement('component-navigation-link')
export class NavigationLinkComponent extends AbstractComponent<NavigationLinkInputData, any> {

    protected inputDataChanged(): void {

    }

   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'NavigationLinkComponent';

   @property()
   icon: string = '';

   @property()
   text: string = '';

   @property()
   href: string = '';

   render() {
      return html`
         <div
            @click="${() => this.linkClicked()}"
            class="${RouterService.getInstance().getPath() == this.href ? 'navItem selected' : 'navItem'}"
         >
            <component-icon icon="${this.icon}" class="navitemIcon"></component-icon>
            <component-typography>${this.text}</component-typography>
         </div>
      `;
   }

   getDefaultInputData(): NavigationLinkInputData {
      return <NavigationLinkInputData>{
         componentIdentifier: NavigationLinkComponent.IDENTIFIER
      };
   }

   getOutputData(): any {
      return {};
   }

   private linkClicked() {
      RouterService.getInstance().navigate(this.href);
   }
}
