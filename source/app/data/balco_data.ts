import {HTTP_CLIENT, Konzern, SESSION_STORE, User} from "./data";
import {ComboboxInputData, ComboboxOption} from "../../input/combobox/model";
import {ComboboxComponent} from "../../input/combobox/component";
import {DatalistInputData, DatalistOption} from "../../input/datalist/model";

export enum BalcoDataChannels {
    KONZERNE = 'KONZERNE',
    USER = 'USER',
    COMPANIES_DLID = 'COMPANIES_DLO',
    MY_COMPANIES_CID = 'COMPANIES_CID',
    SELECTED_COMPANY = 'SELECTED_COMPANY'
}

export class BalcoDataStore {

    public getSelectedCompany(): Konzern {
        return <Konzern>SESSION_STORE.getItem(BalcoDataChannels.SELECTED_COMPANY);
    }

    public saveLoginUser(user: User) {

        SESSION_STORE.setItem(BalcoDataChannels.USER, user);

        let options: ComboboxOption[] = [];

        user.companyDTOS.forEach(companyDTO => {
            options.push(<ComboboxOption>{text: companyDTO.firmenname, value: companyDTO.idl});
        })

        let myCompanies: ComboboxInputData = <ComboboxInputData>{
            componentIdentifier: ComboboxComponent.IDENTIFIER,
            name: 'myCompanies',
            options: options
        };

        SESSION_STORE.setItem(BalcoDataChannels.MY_COMPANIES_CID, myCompanies);
        SESSION_STORE.setItem(BalcoDataChannels.SELECTED_COMPANY, user.companyDTOS[0]);

    }

    logout() {
        SESSION_STORE.removeItem(BalcoDataChannels.USER);
        SESSION_STORE.removeItem(BalcoDataChannels.KONZERNE);
        SESSION_STORE.removeItem(BalcoDataChannels.COMPANIES_DLID);
        SESSION_STORE.removeItem(BalcoDataChannels.MY_COMPANIES_CID);
        SESSION_STORE.removeItem(BalcoDataChannels.SELECTED_COMPANY);
    };

    saveKonzerne(companies: Konzern[]) {
        let companyOptions: DatalistOption[] = [];
        companies.forEach(company => {
            companyOptions.push(<DatalistOption>{text: company.firmenname, value: company.idl + ''})
        });
        SESSION_STORE.setItem(BalcoDataChannels.COMPANIES_DLID, companyOptions);
        SESSION_STORE.setItem(BalcoDataChannels.KONZERNE, companies);

    }


    setSelectedIDL(selectedIDL: string) {
        let konzerne: Konzern[] | null = SESSION_STORE.getItem(BalcoDataChannels.KONZERNE);
        if (konzerne != null) {
            konzerne.forEach(konzern => {
                if (konzern.idl == selectedIDL) {
                    console.log('ändere Konzern: ' + selectedIDL)
                    SESSION_STORE.setItem(BalcoDataChannels.SELECTED_COMPANY, konzern);
                }
            });
        }
    }

    getUser(): User {
        return <User>SESSION_STORE.getItem(BalcoDataChannels.USER);
    }

    getCompaniesDLID(): DatalistInputData {
        return <DatalistInputData>SESSION_STORE.getItem(BalcoDataChannels.COMPANIES_DLID);
    }

    getMyCompaniesCID(): DatalistInputData {
        return <DatalistInputData>SESSION_STORE.getItem(BalcoDataChannels.MY_COMPANIES_CID);
    }

}

export const BALCO_DATA_STORE = new BalcoDataStore();
