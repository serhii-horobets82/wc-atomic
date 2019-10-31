import {ButtonInputData} from "../../atoms/button/model";
import {AbstractInputData} from "../../abstract-component/component";

export interface DataProtectionInputData extends AbstractInputData {
    buttonInputData: ButtonInputData;
    lawtext: string;
}