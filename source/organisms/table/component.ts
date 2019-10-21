import {css, customElement, html, property, TemplateResult, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../abstract/component/component';
import {guard} from 'lit-html/directives/guard';
import {repeat} from 'lit-html/directives/repeat';
import {
    ColumnChangedEventData,
    ColumnInputData,
    RowInputData,
    TableContent,
    TableHeaderInputData,
    TableInputData
} from "./model";
import {ComboboxInputData, ComboboxOption} from "../../input/combobox/model";
import {InputComponent} from "../../input/input/component";
import {DatalistComponent} from "../../input/datalist/component";
import {TextComponent} from "../../atoms/text/component";
import {baseHelper} from "../../util/base";
import {HTTP_CLIENT} from "../../app/data/data";
import {DatalistInputData} from "../../input/datalist/model";
import {TextInputData} from "../../atoms/text/model";
import {InputInputData} from "../../input/input/model";
import {ComboboxComponent} from "../../input/combobox/component";
import {ButtonComponent} from "../../atoms/button/component";
import {ButtonInputData} from "../../atoms/button/model";
import {KeyValueData} from "../form/model";
import {IconComponent} from "../../atoms/icon/component";
import {IconInputData} from "../../atoms/icon/model";

const componentCSS = require('./component.css');

@customElement('component-table')
export class TableComponent extends AbstractComponent<TableInputData, undefined> {
    static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

    static IDENTIFIER: string = 'TableComponent';

    static EVENT_COLUMN_CHANGED: string = 'component-table-column-changed';

    private i18nTablePrefix = 'table_';
    private itemSizeDefaultValue: number = 5;


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
    requestPath: string = '';

    @property()
    requestParams: string = '';

    @property()
    sorting: Boolean = true;

    @property()
    paging: Boolean = true;

    @property()
    filtering: Boolean = true;


    @property()
    sizeComboboxInputData = <ComboboxInputData>{
        componentIdentifier: ComboboxComponent.IDENTIFIER,
        selectedValue: String(this.itemSizeDefaultValue),
        options: [<ComboboxOption>{
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
        }]
    }

    render() {
        return html`
            
            <div class="header">
                ${this.paging ? html`
                
                <component-toolbar>
                
                  <component-spacer slot="leftComponents" clazz="minPaddingLeft"></component-spacer>
                  <span slot="leftComponents">${this.currentPageItemStartIndex()} - ${this.currentPageItemEndIndex()} ${this.getI18NValue(this.i18nTablePrefix.concat('items_of'))}: ${this.totalElements}</span>
                               
                  <span slot="mainComponents">${this.getI18NValue(this.i18nTablePrefix.concat('entries_per_page'))}&nbsp;</span>
                  <component-combobox slot="mainComponents" .inputData="${this.sizeComboboxInputData}"  @combobox-component-selection-change="${(event: CustomEvent) => this.changeSize(event)}"></component-combobox>
                
                  <component-icon slot="rightComponents" iconClazz="fas fa-angle-left" clickable="true" @click="${this.previousPage}"></component-icon>
                  <span slot="rightComponents">&nbsp;${this.getI18NValue(this.i18nTablePrefix.concat('page'))}&nbsp;</span>
                  <component-inputfield slot="rightComponents" type="number" value="${this.page}" size="2" min="1" max="${this.totalPages}"  @component-inputfield-change="${(event: CustomEvent) => this.changePage(event)}"></component-inputfield>
                  <span slot="rightComponents">&nbsp;/&nbsp;${this.totalPages > 0 ? this.totalPages : 1}&nbsp;</span>
                  <component-icon slot="rightComponents" iconClazz="fas fa-angle-right" clickable="true" @click="${this.nextPage}"></component-icon>
                  <component-spacer slot="rightComponents" clazz="minPaddingRight"></component-spacer> 
                  
                </component-toolbar>
                          
                ` : html``}
        </div>
        
        <component-spacer clazz="minPaddingTop"></component-spacer>

         <div class="table">
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
                              <component-toolbar clazz="">
                                  <span slot="mainComponents">${this.getI18NValue(this.getPageName().concat('_').concat(this.i18nTablePrefix).concat(header.columnKey))}</span>
                                  ${this.sorting ? html`<component-icon slot="rightComponents" iconClazz="${header.sortingIconClazz}" class="clickable" @click="${() => this.updateSortProperty(header)}"></component-icon>` : html``}
                              </component-toolbar>
                              </span>
                           `
                )}
                        ${this.filtering ? repeat(
                    this.headers,
                    (header) => html`
                              <span
                                 class="filterColumn"
                                 style="width: ${header.widthPercent}%"
                              >
                                ${this.createFilterComponent(header)}
                              </span>
                           `
                ) : html``}
                     </div>
                  `
        )}
            ${this.rows.length > 0 ? guard(
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
                                             >
                                                <span class="columnHead"
                                                   >${this.headers[columnIndex].columnKey}</span
                                                >
                                                ${this.createColumnComponent(row, column, rowIndex, columnIndex)}
                                             </span>
                                          `
                            )}
                                    `
                    )}
                           </div>
                        `
                )}
                  `
        ) : html`${this.getI18NValue(this.i18nTablePrefix.concat('no_data'))}`}
         
 </div>
         
            <div class="footer">
            
            

           
       
       
                </div>  
      `;
    }

    getDefaultInputData(): TableInputData {
        return <TableInputData>{
            componentIdentifier: TableComponent.IDENTIFIER,
            requestPath: '',
            page: 0,
            size: 5,
            sort: '',
            requestParams: '',
            sorting: false,
            paging: false,
            filtering: false,
            headers: []
        };
    }

    inputDataChanged(): void {

        this.sort = baseHelper.getValue(this.inputData.sort, '');
        this.requestParams = baseHelper.getValue(this.inputData.requestParams, '');
        this.sizeComboboxInputData.selectedValue = String(baseHelper.getValue(this.inputData.size, this.itemSizeDefaultValue));
        this.requestPath = baseHelper.getValue(this.inputData.requestPath, '');
        this.paging = baseHelper.getValue(this.inputData.paging, true);
        this.filtering = baseHelper.getValue(this.inputData.filtering, true);
        this.sorting = baseHelper.getValue(this.inputData.sorting, true);
        this.headers = baseHelper.getValue(this.inputData.headers, []);


        let headerWithUsed: number = 0;
        let headerCountUndefined: number = 0;
        this.headers.forEach((header: TableHeaderInputData) => {
            if (header.widthPercent != undefined) {
                headerWithUsed += header.widthPercent;
            } else {
                headerCountUndefined++;
            }
        });

        let defaultHeaderWidthPercent: number = (100 - headerWithUsed) / headerCountUndefined;
        this.headers.forEach((header) => {
            if (header.widthPercent == undefined) {
                header.widthPercent = defaultHeaderWidthPercent;
            }
            this.setSortingIconClazz(header, this.sort);
        });

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

        let requestPath = this.requestPath.concat('?').concat(this.requestParams).concat('&page=').concat(String((this.page - 1))).concat('&size=').concat(String(this.getItemSize()).concat('&sort=').concat(String(this.sort)).concat(whereClause));

        console.log('table path prefix: ' + requestPath);

        let responsePromise = HTTP_CLIENT.get(requestPath);
        responsePromise.then(response => {
            let bodyTextPromise: Promise<string> = response.text();
            bodyTextPromise.then(tableContentAsJson => {
                let tableContent: TableContent = JSON.parse(tableContentAsJson);
                this.totalElements = tableContent.totalElements;
                this.totalPages = tableContent.totalPages;
                this.numberOfElements = tableContent.numberOfElements;


                let pageable = tableContent.pageable;
                this.sizeComboboxInputData.selectedValue = String(pageable.pageSize);
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
                                (<InputInputData>inputData).value = columnValue;
                                (<InputInputData>inputData).name = columnKey;
                                break;
                            default:
                            case TextComponent.IDENTIFIER:
                                (<TextInputData>inputData).text = columnValue;
                                (<TextInputData>inputData).clazz = 'ellipsis';
                                break;
                            case ComboboxComponent.IDENTIFIER:
                                break;
                            case DatalistComponent.IDENTIFIER:
                                (<DatalistInputData>inputData).selectedValue = columnValue;
                                break;
                            case ButtonComponent.IDENTIFIER:
                                (<ButtonInputData>inputData).text = columnValue;
                                break;
                            case IconComponent.IDENTIFIER:
                                //(<IconInputData>inputData).iconClazz = columnValue;
                                break;

                        }

                        columnsInputDatas.push(<ColumnInputData>{componentInputData: inputData});

                    }

                    let rowInputData: RowInputData = <RowInputData>{colums: columnsInputDatas, source: row};
                    this.rows.push(rowInputData);

                });

                //this.reqUpdate();

            });
        });

    }

    private changePage(event: CustomEvent) {
        let newPage: KeyValueData = event.detail;
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
        let newSize: KeyValueData = event.detail;
        console.log('set new size per page: ' + newSize.value);
        this.sizeComboboxInputData.selectedValue = newSize.value;
        this.loadData();
    }

    private updateSortProperty(header: TableHeaderInputData) {

        let columnKey: string = header.columnKey;

        let sortingKey: KeyValueData | null = this.getSortingKey(columnKey, this.sort);
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
        let sortingKey: KeyValueData | null = this.getSortingKey(columnKey, sort);
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
            return <KeyValueData>{
                key: sortingKeyArray[0],
                value: sortingKeyArray[1]
            }
        }
    }


    private searchValueChanged(event: CustomEvent, header: TableHeaderInputData) {
        console.log("search value change" + JSON.stringify(event.detail));
        let newValue: KeyValueData = event.detail;
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
                return html`<component-inputfield value="${header.searchValue}"  @component-inputfield-keyup="${(event: CustomEvent) => {
                    this.searchValueChanged(event, header)
                }}"></component-inputfield>`;
            case InputComponent.IDENTIFIER:
                return html`<component-inputfield value="${header.searchValue}" .inputData="${header.componentInputData}"  @component-inputfield-keyup="${(event: CustomEvent) => {
                    this.searchValueChanged(event, header)
                }}"></component-inputfield>`;
            default:
                return html``;
        }
    }

    private createColumnComponent(row: RowInputData, column: ColumnInputData, rowIndex: number, columnIndex: number): TemplateResult {
        let componentInputData = column.componentInputData;
        let componentIdentifier = componentInputData.componentIdentifier;
        switch (componentIdentifier) {
            case TextComponent.IDENTIFIER:
                (<TextInputData>componentInputData).clazz = 'ellipsis';
                return html`<component-text .inputData="${componentInputData}"></component-text>`;
            case IconComponent.IDENTIFIER:
                return html`<component-icon .inputData="${componentInputData}"></component-icon>`;
            case InputComponent.IDENTIFIER:
                return html`<component-inputfield .inputData="${componentInputData}"></component-inputfield>`;
            case DatalistComponent.IDENTIFIER:
                return html`<component-datalist .inputData="${componentInputData}" @combobox-datalist-selection-change="${(event: CustomEvent) => {
                    this.createColumnChangeEvent(row, event, rowIndex, columnIndex)
                }}"></component-datalist>`;
            default:
                return html``;
        }


    }

    /**
     * if column value change, dispatch a simple custom event with all necessery data for parent object.
     * @param row
     * @param event
     * @param rowIndex
     * @param columnIndex
     */
    private createColumnChangeEvent(row: RowInputData, event: CustomEvent, rowIndex: number, columnIndex: number) {

        let columnChangedData: ColumnChangedEventData = {
            row: row,
            rowIndex: rowIndex,
            columnIndex: columnIndex,
            newValue: event.detail
        };

        this.dispatchSimpleCustomEvent(
            TableComponent.EVENT_COLUMN_CHANGED,
            columnChangedData
        );

    }

    private getItemSize() {
        let size: number = Number(this.sizeComboboxInputData.selectedValue);
        return size;
    }

    private currentPageItemStartIndex(): Number {
        return this.totalElements == 0 ? 0 : (this.getItemSize() * (this.page - 1)) + 1;
    }

    private currentPageItemEndIndex() {
        return (this.getItemSize() * (this.page - 1) + this.numberOfElements);
    }
}
