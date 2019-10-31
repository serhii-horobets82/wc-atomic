import {HInputData} from "../../atoms/h/model";
import {AbstractInputData} from "../../abstract-component/component";
import {TextInputData} from "../../text/component";

export interface TextWithHeaderInputData extends AbstractInputData {
    headerInputData: HInputData;
    textInputData : TextInputData;
}