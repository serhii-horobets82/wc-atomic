import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { Tile } from '../../interface/atoms';
import { AbstractComponent } from '../abstract/abstract-component';

const componentCSS = require('./tile.scss');

@customElement('component-tile')
export class TileComponent extends AbstractComponent<Tile, undefined> {
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

   getDefaultInputData(): Tile {
      return <Tile>{
         componentIdentifier: TileComponent.IDENTIFIER
      };
   }
}
