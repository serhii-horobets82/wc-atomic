import {ComboboxInputData} from "../../input/combobox/model";
import {KeyValueData} from "../../organisms/form/model";
import {AbstractInputData} from "../../abstract-component/component";

export interface I18NInputData extends AbstractInputData {
    languages: KeyValueData[];
}