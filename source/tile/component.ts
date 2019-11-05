import { css, customElement, html, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';

const componentCSS = require('./component.css');

export class TileInputData extends AbstractInputData {
   componentInputData?: AbstractInputData;
}

@customElement('component-tile')
export class TileComponent extends AbstractComponent<TileInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'TileComponent';

   inputDataChanged() {}

   render() {
      return html`
         <div class="tile">
            <slot></slot>
         </div>
      `;
   }
   getOutputData(): any {
      return undefined;
   }

   getDefaultInputData(): TileInputData {
      return <TileInputData>{
         componentIdentifier: TileComponent.IDENTIFIER
      };
   }
}
