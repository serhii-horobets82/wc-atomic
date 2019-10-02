import {AbstractInputData} from "../../abstract/component/model";

export interface AuthenticatedIconInputData extends AbstractInputData {
    isAuthenticated: boolean;
    loginPage: string;
    logoutPage: string;
}