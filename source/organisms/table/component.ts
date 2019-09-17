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
import {ColumnInputData, RowInputData, TableContent, TableHeaderInputData, TableInputData} from "./model";
import {TextfieldInputData} from "../../atoms/textfield/model";
import {IconGroupComponent} from "../../molecules/icon-group/component";
import {httpClient} from "../../app/data/data";
import {AbstractInputData} from "../../abstract/component/model";

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

    @property()
    page: number = 0;

    @property()
    size: number = 10;

    @property()
    totalElements: number = 0;

    @property()
    totalPages: number = 0;

    @property()
    numberOfElements: number = 0;


    @property()
    sort: string = '';

    render() {
        return html`
         <span class="table" @component-textfield-keyup="${this.reqUpdate}" @component-icon-click="${this.iconClicked}">
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
                        ${repeat(
                    this.headers,
                    (header) => html`
                              <span
                                 class="filterColumn"
                                 style="width: ${header.width}"
                              >
                                 <component-textfield></component-textfield>
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
            <div class="footer">
            
                <component-icon iconClazz="fas fa-angle-left" clickable="true" @click="${() => {
            this.page--;
            this.loadData();
            this.reqUpdate();
        }}"></component-icon>

                <component-icon iconClazz="fas fa-angle-right" clickable="true" @click="${() => {
            this.page++;
            this.loadData();
            this.reqUpdate();
        }}"></component-icon>
                
                Seite: ${(this.page + 1)}<br/>
                Size: ${this.size}<br/>
                Total Elements: ${this.totalElements}<br/>
                Total Pages: ${this.totalPages}<br/>
                Number of Elements: ${this.numberOfElements}<br/>

            </div>
         </span>
      `;
    }

    async itemClicked(event: CustomEvent) {

        console.log('sdkspodk' + event.detail);


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
            page: 0,
            size: 10,
            sort: '',
        };
    }

    inputDataChanged(): void {
        if (this.inputData.headers != null) {
            this.headers = this.inputData.headers;
        }
        this.loadData();
    }

    getOutputData(): undefined {
        return undefined;
    }

    private loadData() {

        let responsePromise = httpClient.get('/APP/FIND?page=' + this.page + '&size=10&sort=id%3Adesc%3B');
        responsePromise.then(response => {
            let bodyTextPromise: Promise<string> = response.text();
            bodyTextPromise.then(tableContentAsJson => {
                let tableContent: TableContent = JSON.parse(tableContentAsJson);
                this.totalElements = tableContent.totalElements;
                this.totalPages = tableContent.totalPages;
                this.numberOfElements = tableContent.numberOfElements;


                let pageable = tableContent.pageable;
                this.size = pageable.pageSize;
                this.page = pageable.pageNumber;

                let content = tableContent.content;

                this.rows = [];

                content.forEach((row, index) => {
                    console.debug("row= " + JSON.stringify(row));
                    console.debug("index= " + index);

                    let keys = Object.keys(row);
                    let columnSize = keys.length;
                    let maxColumnWidth = 100 / columnSize + "%";

                    let columnsInputDatas: ColumnInputData[] = [];
                    keys.forEach((columnName, columnIndex) => {
                        console.debug('columnName= ' + columnName);
                        console.debug('columnIndex= ' + columnIndex);

                        let columnValue = Object.values(row).slice(columnIndex, columnIndex + 1)[0];

                        let tableHeaderInput: TableHeaderInputData;
                        if (this.headers.length > columnIndex) {
                            tableHeaderInput = this.headers[columnIndex];
                            if (tableHeaderInput.width == null || tableHeaderInput.width > maxColumnWidth) {
                                tableHeaderInput.width = maxColumnWidth;
                            }
                        } else {
                            tableHeaderInput = <TableHeaderInputData>{
                                columnIdentifier: TextComponent.IDENTIFIER,
                                text: columnName,
                                width: maxColumnWidth,

                            };
                            this.headers.push(tableHeaderInput);
                        }

                        let abstractInputData: AbstractInputData;
                        switch (tableHeaderInput.columnIdentifier) {
                            default:
                            case TextComponent.IDENTIFIER:
                                abstractInputData = <TextInputData>{
                                    componentIdentifier: TextComponent.IDENTIFIER,
                                    text: columnValue
                                };
                                break;
                        }

                        let columnInputData: ColumnInputData = <ColumnInputData>{componentContent: abstractInputData};
                        columnsInputDatas.push(columnInputData);

                    });

                    let rowInputData: RowInputData = <RowInputData>{colums: columnsInputDatas};
                    this.rows.push(rowInputData);

                });

            })

        }).catch(reason => {
            console.log("REASEON:" + reason);
        })

    }
}
