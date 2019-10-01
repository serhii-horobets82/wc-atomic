import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../abstract/component/component';
import {guard} from 'lit-html/directives/guard';
import {repeat} from 'lit-html/directives/repeat';
import {ComponentLoader} from '../../abstract/component-loader';
import {ColumnInputData, RowInputData, TableContent, TableHeaderInputData, TableInputData} from "./model";
import {ComboboxOption} from "../../input/combobox/model";
import {baseHelper} from "../../util/base";
import {httpClient} from "../../app/data/data";
import {InputComponent} from "../../input/input/component";
import {TextInputData} from "../../atoms/text/model";
import {ComboboxComponent} from "../../input/combobox/component";
import {DatalistComponent} from "../../input/datalist/component";
import {ButtonComponent} from "../../atoms/button/component";
import {Button} from "../../atoms/button/model";
import {TextfieldInputData} from "../../input/input/model";
import {KeyValueOutputData} from "../form/model";
import {TextComponent} from "../../atoms/text/component";
import {DatalistInputData} from "../../input/datalist/model";

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
    page: number = 1;

    @property()
    totalElements: number = 0;

    @property()
    totalPages: number = 0;

    @property()
    numberOfElements: number = 0;

    @property()
    sort: string = '';

    @property()
    size: number = 20;

    sizeOptions: ComboboxOption[] = [<ComboboxOption>{
        text: '5',
        value: '5'
    }, <ComboboxOption>{
        text: '10',
        value: '10'
    }, <ComboboxOption>{
        text: '20',
        value: '20'
    }, <ComboboxOption>{
        text: '50',
        value: '50'
    }, <ComboboxOption>{
        text: '100',
        value: '100'
    }];

    render() {
        return html`

            <component-flex-container gridClazz="grid_100">
            
                <component-icon iconClazz="fas fa-angle-left" clickable="true" @click="${this.previousPage}"></component-icon>
                <component-inputfield type="number" value="${this.page}" size="2" min="1" max="${this.totalPages}"  @component-inputfield-change="${(event: CustomEvent) => this.changePage(event)}"></component-inputfield> / ${this.totalPages}
                <component-icon iconClazz="fas fa-angle-right" clickable="true" @click="${this.nextPage}"></component-icon>
                
                
                <component-combobox .options="${this.sizeOptions}" .selectedValue="${this.size}" @combobox-component-selection-change="${(event: CustomEvent) => this.changeSize(event)}"></component-combobox>

                ${this.numberOfElements} von insgesamt: ${this.totalElements}

        </component-flex-container>


         <span class="table">
            ${guard(
            [this.headers],
            () =>
                html`
                     <div class="head">
                        ${repeat(
                    this.headers,
                    (header) => html`
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
                                 @component-inputfield-keyup="${(event: CustomEvent) => {this.searchValueChanged(event, header)}}"
                              >
                                ${this.createFilterComponent(header)}
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

        //where clause - START
        let whereClause = '';
        this.headers.forEach(header => {
            if (baseHelper.isNotBlank(header.searchValue)) {
                whereClause = whereClause.concat(header.columnKey, '=', header.searchValue);
            }
        });
        if (whereClause.length > 0) {
            whereClause = "&".concat(whereClause);
        }
        //where clause - END

        let requestUrl = '/BALANCE/FIND?page='.concat(String((this.page - 1))).concat('&size=').concat(String(this.size).concat('&sort=').concat(String(this.sort)).concat(whereClause));
        console.log('request url: ' + requestUrl);

        let responsePromise = httpClient.get(requestUrl);
        responsePromise.then(response => {
            let bodyTextPromise: Promise<string> = response.text();
            bodyTextPromise.then(tableContentAsJson => {
                let tableContent: TableContent = JSON.parse(tableContentAsJson);
                this.totalElements = tableContent.totalElements;
                this.totalPages = tableContent.totalPages;
                this.numberOfElements = tableContent.numberOfElements;


                let pageable = tableContent.pageable;
                this.size = pageable.pageSize;
                this.page = pageable.pageNumber + 1;

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

                        let inputData = baseHelper.clone(tableHeaderInput.componentInputData);
                        switch (inputData.componentIdentifier) {
                            case InputComponent.IDENTIFIER:
                                (<TextfieldInputData>inputData).value = columnValue;
                                (<TextfieldInputData>inputData).name = columnKey;
                                break;
                            default:
                            case TextComponent.IDENTIFIER:
                                (<TextInputData>inputData).text = columnValue;
                                break;
                            case ComboboxComponent.IDENTIFIER:
                                break;
                            case DatalistComponent.IDENTIFIER:
                                (<DatalistInputData>inputData).selectedValue = columnValue;
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

    private changePage(event: CustomEvent) {
        let newPage: KeyValueOutputData = event.detail;
        let newPageValue: number = Number(newPage.value);
        console.log('set new page: ' + newPageValue);
        if (newPageValue > this.totalPages) {
            newPageValue = this.totalPages;
        }
        this.page = newPageValue;
        this.loadData();
    }


    private previousPage() {
        if (this.page > 1) {
            this.page--;
            this.loadData();
        }
    }

    private nextPage() {
        if (this.page < this.totalPages) {
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


    private searchValueChanged(event: CustomEvent, header: TableHeaderInputData) {
        console.log("search value change" + JSON.stringify(event.detail));
        let newValue: KeyValueOutputData = event.detail;
        header.searchValue = newValue.value;
        this.loadData();
    }

    /**
     *
     * create table filter component and add header inputData to new component.
     *
     * @param header
     */
    private createFilterComponent(header: TableHeaderInputData) {
        let componentIdentifier = header.componentInputData.componentIdentifier;
        switch (componentIdentifier) {
            case TextComponent.IDENTIFIER:
                return html`<component-inputfield value="${header.searchValue}"></component-inputfield>`;
            case InputComponent.IDENTIFIER:
                return html`<component-inputfield value="${header.searchValue}" .inputData="${header.componentInputData}"></component-inputfield>`;
            default:
                return html``;
        }
    }
}
