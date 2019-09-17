import {AbstractInputData} from "../../abstract/component/model";
import {Button} from "../../atoms/button/model";
import {FlexContainerInputData} from "../flex-container/model";

export interface KeyValueOutputData {
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
    buttonInputDatas?: Button[];
    flexContainerInputData: FlexContainerInputData;
}