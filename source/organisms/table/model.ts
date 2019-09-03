import {AbstractInputData} from "../../abstract/component/model";

export interface TableHeaderInputData extends AbstractInputData {
    text: string;
    width: string;
}

export interface ColumnInputData {
    componentContent: AbstractInputData;
}

export interface RowInputData {
    colums: ColumnInputData[];
}

export interface TableInputData extends AbstractInputData {
    headers: TableHeaderInputData[];
    rows: RowInputData[];
}