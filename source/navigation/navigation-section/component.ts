import { css, customElement, html, unsafeCSS } from 'lit-element';
import { AbstractComponent } from '../../abstract-component/component';
import { LinkInputData } from '../../link/component';

const componentCSS = require('./component.css');

@customElement('component-navigation-section')
export class NavigationSectionComponent extends AbstractComponent<LinkInputData, any> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'NavigationSectionComponent';

   render() {
      return html`
         <div>
            <slot name="section"></slot>
            <slot></slot>
         </div>
      `;
   }

   getDefaultInputData(): LinkInputData {
      return <LinkInputData>{
         componentIdentifier: NavigationSectionComponent.IDENTIFIER
      };
   }

   getOutputData(): any {
      return {};
   }

   protected inputDataChanged() {}
}
