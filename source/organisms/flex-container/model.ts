import {AbstractInputData} from "../../abstract-component/component";

export interface FlexContainerInputData extends AbstractInputData {
    gridClazz?: string;
    itemClazz?: string;
    columnFlexBasisValue?: string;
    columnFlexBasisValues?: string[];
    componentsInputData: AbstractInputData[];
}