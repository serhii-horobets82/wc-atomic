import {AbstractInputData} from "../../abstract/component/model";

export interface LoginInputData extends AbstractInputData {

}

export interface AuthenticatedSuccessfullyEventData {

}

export interface AuthenticatedFailureEventData {
    reason: string;
}

export interface LogoutEventData {
}