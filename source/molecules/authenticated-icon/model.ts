import {AbstractInputData} from "../../abstract-component/component";

export interface AuthenticatedIconInputData extends AbstractInputData {
    isAuthenticated: boolean;
    loginPage: string;
    logoutPage: string;
}