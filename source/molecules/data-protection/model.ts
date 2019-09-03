import {Button} from "../../atoms/button/model";
import {AbstractInputData} from "../../interface/atoms";

export interface DataProtectionInputData extends AbstractInputData {
    buttonInputData: Button;
    lawtext: string;
}