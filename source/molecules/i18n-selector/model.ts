import {AbstractInputData} from "../../abstract/component/model";
import {ComboboxInputData} from "../../input/combobox/model";
import {KeyValueData} from "../../organisms/form/model";

export interface I18NInputData extends AbstractInputData {
    languages: KeyValueData[];
}