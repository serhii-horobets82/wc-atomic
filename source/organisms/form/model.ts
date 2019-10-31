import {ButtonInputData} from "../../atoms/button/model";
import {FlexContainerInputData} from "../flex-container/model";
import {AbstractInputData} from "../../abstract-component/component";

export interface KeyValueData {
    key: string;
    value: any;
}

export interface FormComponentOutputData {
    jsonObject: any;
    formData: FormData;
}

export interface FormComponentInputData extends AbstractInputData {
    gridClazz?: string;
    columnClazz?: string;
    buttonInputDatas?: ButtonInputData[];
    flexContainerInputData: FlexContainerInputData;
}