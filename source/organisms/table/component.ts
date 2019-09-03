import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../abstract/component/component';
import {guard} from 'lit-html/directives/guard';
import {repeat} from 'lit-html/directives/repeat';
import {TextComponent} from '../../atoms/text/component';
import {IconComponent} from '../../atoms/icon/component';
import {TextfieldComponent} from '../../atoms/textfield/component';
import {ImgComponent} from '../../atoms/img/component';
import {ComponentLoader} from '../../abstract/component-loader';
import {ImgModel} from "../../atoms/img/model";
import {IconInputData} from "../../atoms/icon/model";
import {TextInputData} from "../../atoms/text/model";
import {ColumnInputData, RowInputData, TableHeaderInputData, TableInputData} from "./model";
import {TextfieldInputData} from "../../atoms/textfield/model";

const componentCSS = require('./component.css');

@customElement('component-table')
export class TableComponent extends AbstractComponent<TableInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'TableComponent';

   static EVENT_COLUMN_CLICK: string = 'component-table-column-click';

   @property()
   headers: TableHeaderInputData[] = [];

   @property()
   rows: RowInputData[] = [];

   render() {
      return html`
         <span class="table">
            ${guard(
               this.headers,
               () =>
                  html`
                     <div class="head">
                        ${repeat(
                           this.headers,
                           (header) => html`
                              <span
                                 class="headColumn"
                                 style="width: ${header.width}"
                              >
                                 ${header.text}
                              </span>
                           `
                        )}
                     </div>
                  `
            )}
            ${guard(
               this.rows,
               () =>
                  html`
                     ${repeat(
                        this.rows,
                        (row, rowIndex) => html`
                           <div
                              class="row ${rowIndex % 2 == 0 ? 'odd' : 'even'}"
                           >
                              ${guard(
                                 row.colums,
                                 () =>
                                    html`
                                       ${repeat(
                                          row.colums,
                                          (column, columnIndex) => html`
                                             <span
                                                class="column"
                                                style="width: ${this.headers[
                                                   columnIndex
                                                ].width};"
                                                @click="${(event: MouseEvent) =>
                                                   this.columnClicked(
                                                      rowIndex,
                                                      columnIndex,
                                                      event
                                                   )}"
                                             >
                                                <span class="columnHead"
                                                   >${this.headers[columnIndex]
                                                      .text}</span
                                                >
                                                ${ComponentLoader.INSTANCE.createComponentFromInputData(
                                                   column.componentContent
                                                )}
                                             </span>
                                          `
                                       )}
                                    `
                              )}
                           </div>
                        `
                     )}
                  `
            )}
         </span>
      `;
   }

   async columnClicked(
      rowIndex: number,
      columnIndex: number,
      event: MouseEvent
   ) {
      console.log('rowIndex=' + rowIndex);
      console.log('columnIndex=' + columnIndex);
      console.log('event=' + JSON.stringify(event));

      let columnClickedData: any = {
         rowIndex: rowIndex,
         columnIndex: columnIndex
      };

      this.dispatchCompoundCustomEvent(
         TableComponent.EVENT_COLUMN_CLICK,
         event,
         columnClickedData
      );
   }

   getDefaultInputData(): TableInputData {
      return <TableInputData>{
         componentIdentifier: TableComponent.IDENTIFIER,
         headers: [
            <TableHeaderInputData>{ text: 'Artikelnummer', width: '25%' },
            <TableHeaderInputData>{ text: 'Bezeichnung', width: '30%' },
            <TableHeaderInputData>{ text: '', width: '10%' },
            <TableHeaderInputData>{ text: 'Preis', width: '10%' },
            <TableHeaderInputData>{ text: 'Menge', width: '15%' },
            <TableHeaderInputData>{ text: '', width: '10%' }
         ],
         rows: [
            this.getDemoRow(),
            this.getDemoRow(),
            this.getDemoRow(),
            this.getDemoRow(),
            this.getDemoRow(),
            this.getDemoRow(),
            this.getDemoRow()
         ]
      };
   }

   inputDataChanged(): void {
      this.headers = this.inputData.headers;
      this.rows = this.inputData.rows;
   }

   getOutputData(): undefined {
      return undefined;
   }

   private getDemoRow(): RowInputData {
      return <RowInputData>{
         colums: [
            <ColumnInputData>{
               componentContent: <TextInputData>{
                  componentIdentifier: TextComponent.IDENTIFIER,
                  text: 'GRP_110'
               }
            },
            <ColumnInputData>{
               componentContent: <TextInputData>{
                  componentIdentifier: TextComponent.IDENTIFIER,
                  text: 'Microsoft Office Suite',
               }
            },
            <ColumnInputData>{
               componentContent: <ImgModel>{
                  componentIdentifier: ImgComponent.IDENTIFIER,
                  src: 'https://picsum.photos/150/150',
                  clazz: 'imageHeightHundred'
               }
            },
            <ColumnInputData>{
               componentContent: <TextInputData>{
                  componentIdentifier: TextComponent.IDENTIFIER,
                  text: '4,90'
               }
            },
            <ColumnInputData>{
               componentContent: <TextfieldInputData>{
                  componentIdentifier: TextfieldComponent.IDENTIFIER,
                  name: 'menge',
                  size: 5
               }
            },
            <ColumnInputData>{
               componentContent: <IconInputData>{
                  componentIdentifier: IconComponent.IDENTIFIER,
                  iconClazz: 'icon-search',
                  clickable: true
               }
            }
         ]
      };
   }
}
