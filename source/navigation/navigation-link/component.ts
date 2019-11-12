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
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'NavigationLinkComponent';

   @property()
   iconClazz: string = '';

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
            <component-icon iconClazz="${this.iconClazz}" class="navitemIcon"></component-icon>
            <component-text>${this.text}</component-text>
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

   protected inputDataChanged() {
      this.text = this.basicService.getValue(this.inputData.text, '');
      this.iconClazz = this.basicService.getValue(this.inputData.iconClazz, '');
      this.href = this.basicService.getValue(this.inputData.href, '');
   }

   private linkClicked() {
      RouterService.getInstance().navigate(this.href);
   }
}
