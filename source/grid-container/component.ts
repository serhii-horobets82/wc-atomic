import { css, customElement, html, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';

const componentCSS = require('./component.css');

export class GridContainerInputData extends AbstractInputData {}

@customElement('component-grid-container')
export class GridComponent extends AbstractComponent<GridContainerInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'GridComponent';

   render() {
      return html`
         <div class="GRID_CONTAINER">
            <slot></slot>
         </div>
      `;
   }

   getOutputData(): undefined {
      return undefined;
   }

   protected inputDataChanged(): void {}
}
