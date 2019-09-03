import {AbstractInputData} from "../../abstract/component/model";

export interface FlexContainerInputData extends AbstractInputData {
    gridClazz?: string;
    itemClazz?: string;
    columnFlexBasisValue?: string;
    columnFlexBasisValues?: string[];
    componentsInputData: AbstractInputData[];
}