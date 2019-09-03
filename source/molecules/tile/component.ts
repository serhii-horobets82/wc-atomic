import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent } from '../../abstract/component/component';
import {TileInputData} from "./model";

const componentCSS = require('./component.css');

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
