import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { BasicService } from '@domoskanonos/frontend-basis';
import { FlexContainerInputData } from '..';

const componentCSS = require('./component.css');

export class GridContainerInputData extends AbstractInputData {
   gridTemplateRows: string[] = [];
   gridTemplateColumns: string[] = [];
   height: string = '';
}

@customElement('component-grid-container')
export class GridComponent extends AbstractComponent<GridContainerInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'GridComponent';

   @property()
   gridTemplateRows: string[] = [];

   @property()
   gridTemplateColumns: string[] = [];

   @property()
   height: string = '';

   render() {
      return html`
         <div
            class="GRID_CONTAINER"
            style="${this.toGridTemplateRowsStyle(this.gridTemplateRows)}${this.toGridTemplateColumnsStyle(
               this.gridTemplateColumns
            )}${this.toHeightStyle(this.height)}"
         >
            <slot></slot>
         </div>
      `;
   }

   getOutputData(): undefined {
      return undefined;
   }

   protected inputDataChanged(): void {
      let defaultData: GridContainerInputData = new GridContainerInputData();
      this.gridTemplateRows = BasicService.getUniqueInstance().getValue(
         this.inputData.gridTemplateRows,
         defaultData.gridTemplateRows
      );
      this.gridTemplateColumns = BasicService.getUniqueInstance().getValue(
         this.inputData.gridTemplateColumns,
         defaultData.gridTemplateColumns
      );
      this.height = BasicService.getUniqueInstance().getValue(this.inputData.height, defaultData.height);
   }

   private toGridTemplateRowsStyle(gridTemplateRows: string[]) {
      let gridTemplateRowsStyle: string = '';
      if (gridTemplateRows.length > 0) {
         gridTemplateRowsStyle = 'grid-template-rows:';
         gridTemplateRows.forEach((value) => {
            gridTemplateRowsStyle = gridTemplateRowsStyle.concat(' ').concat(value);
         });
         gridTemplateRowsStyle = gridTemplateRowsStyle.concat(';');
      }
      return gridTemplateRowsStyle;
   }

   private toGridTemplateColumnsStyle(gridTemplateColumns: string[]) {
      let gridTemplateColumnsStyle: string = '';
      if (gridTemplateColumns.length > 0) {
         gridTemplateColumnsStyle = 'grid-template-columns:';
         gridTemplateColumns.forEach((value) => {
            gridTemplateColumnsStyle = gridTemplateColumnsStyle.concat(' ').concat(value);
         });
         gridTemplateColumnsStyle = gridTemplateColumnsStyle.concat(';');
      }
      return gridTemplateColumnsStyle;
   }

   private toHeightStyle(height: string) {
      return height.length > 0 ? 'height:'.concat(height).concat(';') : '';
   }
}
