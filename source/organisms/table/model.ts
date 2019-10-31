import {KeyValueData} from "../form/model";
import {AbstractInputData} from "../../abstract-component/component";

export interface TableHeaderInputData {
    columnKey: string;
    valueProperty?: KeyValueData;
    widthPercent?: number;
    sortingIconClazz?: string;
    searchValue: string;
    componentInputData: AbstractInputData;
}


export interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

export interface Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
    paged: boolean;
}

export interface TableContent {
    content: any[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
    sort: Sort;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}


export interface ColumnInputData {
    componentInputData: AbstractInputData;
}

export interface RowInputData {
    colums: ColumnInputData[];
    source: any;
}

export interface TableInputData extends AbstractInputData {
    requestPath: string;
    requestParams?: string;
    page?: number;
    size?: number;
    sort?: string;
    sorting?: boolean;
    paging?: boolean;
    filtering?: boolean;
    headers?: TableHeaderInputData[];
}


export interface ColumnChangedEventData {
    row: RowInputData;
    rowIndex: number;
    columnIndex: number;
    newValue: any;
}
