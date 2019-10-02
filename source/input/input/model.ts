import {AbstractInputData} from "../../abstract/component/model";

export interface InputInputData extends AbstractInputData {
    name: string;
    value?: string;
    placeholder?: string;
    maxlength?: number;
    size?: number;
    type?: string;
}