import {Button} from "../../atoms/button/model";
import {AbstractInputData} from "../../abstract/component/model";

export interface DataProtectionInputData extends AbstractInputData {
    buttonInputData: Button;
    lawtext: string;
}