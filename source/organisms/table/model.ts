import {AbstractInputData} from "../../abstract/component/model";

export interface TableHeaderInputData {
    columnKey: string;
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
}

export interface TableInputData extends AbstractInputData {
    page: number;
    size: number;
    sort: string;
    headers?: TableHeaderInputData[];
}