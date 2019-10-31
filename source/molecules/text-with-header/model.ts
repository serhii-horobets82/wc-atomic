import {AbstractInputData} from "../../abstract-component/model";
import {TextInputData} from "../../text/model";
import {HInputData} from "../../atoms/h/model";

export interface TextWithHeaderInputData extends AbstractInputData {
    headerInputData: HInputData;
    textInputData : TextInputData;
}