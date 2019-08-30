import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent } from '../abstract/abstract-component';
import { ECommerceItem, ECommerceTileList, Icon } from '../interface/atoms';

const componentCSS = require('./e-commerce-tile-list.scss');

@customElement('component-e-commerce-tile-list')
export class ECommerceTileListComponent extends AbstractComponent<
   ECommerceTileList,
   undefined
> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'ECommerceTileListComponent';

   @property()
   gridClazz: string;

   @property()
   columnFlexBasisValue: string | undefined;

   @property()
   items: ECommerceItem[];

   render() {
      return html`
         <component-flex-container
            gridClazz="${this.gridClazz}"
            itemClazz="minPaddingBottom"
            .columnFlexBasisValue="${this.columnFlexBasisValue}"
            ._componentsInputData="${this.items}"
         ></component-flex-container>
      `;
   }

   getDefaultInputData(): ECommerceTileList {
      return <ECommerceTileList>{
         componentIdentifier: ECommerceTileListComponent.IDENTIFIER
      };
   }

   inputDataChanged() {
      this.gridClazz = this.inputData.gridClazz;
      this.columnFlexBasisValue = this.inputData.columnFlexBasisValue;
      this.items = this.inputData.items;
   }

   getOutputData(): any {
      return undefined;
   }
}
