import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../abstract/component/component';
import {guard} from 'lit-html/directives/guard';
import {repeat} from 'lit-html/directives/repeat';
import {TextComponent} from '../../atoms/text/component';
import {TextfieldComponent} from '../../atoms/textfield/component';
import {ComponentLoader} from '../../abstract/component-loader';
import {TextInputData} from "../../atoms/text/model";
import {ColumnInputData, RowInputData, TableContent, TableHeaderInputData, TableInputData} from "./model";
import {httpClient} from "../../app/data/data";
import {ComboboxComponent} from "../../atoms/combobox/component";
import {DatalistComponent} from "../../atoms/datalist/component";
import {ButtonComponent} from "../../atoms/button/component";
import {Button} from "../../atoms/button/model";
import {KeyValueOutputData} from "../form/model";
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
         <span class="table" @component-textfield-keyup="${this.reqUpdate}" @component-icon-click="">
            ${guard(
            [this.headers],
            () =>
                html`
                     <div class="head">
                        ${repeat(
                    this.headers,
                    (header, headerIndex) => html`
                              <span
                                 class="headColumn"
                                 style="width: ${header.widthPercent}%"
                              >
                                 ${header.columnKey}
                                 <component-icon iconClazz="${header.sortingIconClazz}" class="clickable" @click="${() => this.updateSortProperty(header)}"></component-icon>
                              </span>
                           `
                )}
                        ${repeat(
                    this.headers,
                    (header) => html`
                              <span
                                 class="filterColumn"
                                 style="width: ${header.widthPercent}%"
                              >
                                 <component-textfield></component-textfield>
                              </span>
                           `
                )}
                     </div>
                  `
        )}
            ${guard(
            [this.rows],
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
                                    ].widthPercent}%;"
                                                @click="${(event: MouseEvent) =>
                                    this.columnClicked(
                                        rowIndex,
                                        columnIndex,
                                        event
                                    )}"
                                             >
                                                <span class="columnHead"
                                                   >${this.headers[columnIndex]
                                    .columnKey}</span
                                                >
                                                ${ComponentLoader.INSTANCE.createComponentFromInputData(
                                    column.componentInputData
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
                <component-icon iconClazz="fas fa-angle-left" clickable="true" @click="${this.previousPage}"></component-icon>
                <component-icon iconClazz="fas fa-angle-right" clickable="true" @click="${this.nextPage}"></component-icon>
                
                <component-textfield value="${this.size}" @component-textfield-keyup="${(event: CustomEvent) => this.changeSize(event)}"></component-textfield>
                
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
            headers: []
        };
    }

    inputDataChanged(): void {
        this.sort = this.inputData.sort;
        if (this.inputData.headers != null) {
            this.headers = this.inputData.headers;
            let maxColumnWidth: number = 100 / this.headers.length;
            this.headers.forEach((header) => {
                if (header.widthPercent == undefined || header.widthPercent > maxColumnWidth) {
                    header.widthPercent = maxColumnWidth;
                }
                this.setSortingIconClazz(header, this.inputData.sort);
            })
        }
        this.loadData();
    }

    getOutputData(): undefined {
        return undefined;
    }

    private loadData() {

        let responsePromise = httpClient.get('/BALANCE/FIND?page=' + this.page + '&size=' + this.size + '&sort=' + this.sort);
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

                    let columnsInputDatas: ColumnInputData[] = [];

                    for (const tableHeaderInput of this.headers) {

                        let columnKey = tableHeaderInput.columnKey;
                        let columnValue: any = {};

                        keys.forEach((columnName, columnIndex) => {
                            if (tableHeaderInput.columnKey === columnName) {
                                console.debug('columnName= ' + columnName);
                                console.debug('columnIndex= ' + columnIndex);
                                columnValue = Object.values(row).slice(columnIndex, columnIndex + 1)[0];
                            }
                        });

                        let inputData = tableHeaderInput.componentInputData;
                        switch (inputData.componentIdentifier) {
                            case TextfieldComponent.IDENTIFIER:
                                (<TextfieldInputData>inputData).value = columnValue;
                                break;
                            default:
                            case TextComponent.IDENTIFIER:
                                (<TextInputData>inputData).text = columnValue;
                                break;
                            case ComboboxComponent.IDENTIFIER:
                                break;
                            case DatalistComponent.IDENTIFIER:
                                break;
                            case ButtonComponent.IDENTIFIER:
                                (<Button>inputData).text = columnValue;
                                break;
                        }

                        columnsInputDatas.push(<ColumnInputData>{componentInputData: inputData});

                    }

                    let rowInputData: RowInputData = <RowInputData>{colums: columnsInputDatas};
                    this.rows.push(rowInputData);
                });

                //this.reqUpdate();

            });
        });

    }

    private previousPage() {
        if (this.page > 0) {
            this.page--;
            this.loadData();
        }
    }

    private nextPage() {
        if ((this.page + 1) < this.totalPages) {
            this.page++;
            this.loadData();
        }
    }

    private changeSize(event: CustomEvent) {
        let newSize: KeyValueOutputData = event.detail;
        console.log('set new size per page: ' + newSize.value);
        this.size = newSize.value;
        this.loadData();
    }

    private updateSortProperty(header: TableHeaderInputData) {

        let columnKey: string = header.columnKey;

        let sortingKey: KeyValueOutputData | null = this.getSortingKey(columnKey, this.sort);
        header.sortingIconClazz = 'fas fa-sort';

        if (sortingKey != null) {
            switch (sortingKey.value) {
                case 'desc':
                    this.sort = this.sort.replace(columnKey.concat(':desc;'), columnKey.concat(':asc;'));
                    break;
                case 'asc':
                    this.sort = this.sort.replace(columnKey.concat(':asc;'), '');
                    break;
            }
        } else {
            this.sort = this.sort.concat(columnKey, ':desc;')
        }

        console.log('new sorting: ' + this.sort);
        this.setSortingIconClazz(header, this.sort);
        this.headers = this.headers.map((item) => item);
        this.loadData();
    }


    private setSortingIconClazz(tableHeaderInputData: TableHeaderInputData, sort: string) {
        let columnKey: string = tableHeaderInputData.columnKey;
        let sortingKey: KeyValueOutputData | null = this.getSortingKey(columnKey, sort);
        tableHeaderInputData.sortingIconClazz = 'fas fa-sort';
        if (sortingKey != null) {
            switch (sortingKey.value) {
                case 'desc':
                    tableHeaderInputData.sortingIconClazz = 'fas fa-sort-up';
                    break;
                case 'asc':
                    tableHeaderInputData.sortingIconClazz = 'fas fa-sort-down';
                    break;
            }
        }
        console.log('new sortingIconClazz: ' + tableHeaderInputData.sortingIconClazz);
    }


    private getSortingKey(columnKey: string, sort: string) {
        let indexOfColumnKey = this.sort.indexOf(columnKey);
        if (indexOfColumnKey == -1) {
            return null;
        } else {
            let subSort = sort.substr(indexOfColumnKey);
            let sortingKeyAsString = subSort.substr(0, subSort.indexOf(';'));
            let sortingKeyArray = sortingKeyAsString.split(':');
            return <KeyValueOutputData>{
                key: sortingKeyArray[0],
                value: sortingKeyArray[1]
            }
        }
    }


}
