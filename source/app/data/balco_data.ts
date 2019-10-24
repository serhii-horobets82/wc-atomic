import {ComboboxInputData, ComboboxOption} from "../../input/combobox/model";
import {ComboboxComponent} from "../../input/combobox/component";
import {DatalistInputData, DatalistOption} from "../../input/datalist/model";
import {DatalistComponent} from "../../input/datalist/component";
import {BalanceOverview, HTTP_CLIENT, Konzern, User} from "./data";
import {LOCAL_STORE, SESSION_STORE} from "../../util/storage/storage";
import {FileUpload} from "../../util/http-client/http-client";

export enum BalcoDataChannels {
    KONZERNE = 'KONZERNE',
    USER = 'USER',
    COMPANIES_DLID = 'COMPANIES_DLO',
    MY_COMPANIES_CID = 'COMPANIES_CID',
    SELECTED_COMPANY = 'SELECTED_COMPANY',
    BALANCE_OVERVIEW_K = 'BALANCE_OVERVIEW_K',
    BALANCE_OVERVIEW_D = 'BALANCE_OVERVIEW_D',
    IMPORT_LAST_UPLOAD = 'IMPORT_LAST_UPLOAD',
}

export class BalcoDataStore {
    IMG_RESOURCE_URL: string = "http://v220190910399797452.supersrv.de/img/";


    public getSelectedCompany(): Konzern {
        return <Konzern>SESSION_STORE.getItem(BalcoDataChannels.SELECTED_COMPANY);
    }

    setSelectedIDL(selectedIDL: string) {
        console.log('Konzernauswahl, neuer Konzern: ' + selectedIDL);
        let konzerne: Konzern[] | null = SESSION_STORE.getItem(BalcoDataChannels.KONZERNE);
        if (konzerne != null) {
            konzerne.forEach(konzern => {
                if (konzern.idl == selectedIDL) {
                    console.log('ändere Konzern: ' + selectedIDL);
                    SESSION_STORE.setItem(BalcoDataChannels.SELECTED_COMPANY, konzern);
                    let myCompaniesCID: ComboboxInputData = this.getMyCompaniesCID();
                    myCompaniesCID.selectedValue = selectedIDL;
                    this.setMyCompaniesCID(myCompaniesCID);
                }
            });
        }
    }

    public saveLoginUser(user: User) {

        SESSION_STORE.setItem(BalcoDataChannels.USER, user);

        let options: ComboboxOption[] = [];

        user.companyDTOS.forEach(companyDTO => {
            options.push(<ComboboxOption>{
                text: companyDTO.idl.concat(' - ').concat(companyDTO.firmenname),
                value: companyDTO.idl
            });
        });

        let myCompanies: ComboboxInputData = <ComboboxInputData>{
            componentIdentifier: ComboboxComponent.IDENTIFIER,
            name: 'myCompanies',
            options: options
        };

        this.setMyCompaniesCID(myCompanies);
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
            companyOptions.push(<DatalistOption>{text: company.idl.concat(' - ').concat(company.firmenname), value: company.idl + ''})
        });

        let companyDatalistInputData: DatalistInputData = <DatalistInputData>{
            componentIdentifier: DatalistComponent.IDENTIFIER,
            selectedValue: companyOptions[0].value,
            options: companyOptions
        };

        SESSION_STORE.setItem(BalcoDataChannels.COMPANIES_DLID, companyDatalistInputData);
        SESSION_STORE.setItem(BalcoDataChannels.KONZERNE, companies);

    }

    getCompaniesDLID(): DatalistInputData {
        return <DatalistInputData>SESSION_STORE.getItem(BalcoDataChannels.COMPANIES_DLID);
    }

    getUser(): User {
        return <User>SESSION_STORE.getItem(BalcoDataChannels.USER);
    }

    getMyCompaniesCID(): ComboboxInputData {
        let item: ComboboxInputData | null = <DatalistInputData>SESSION_STORE.getItem(BalcoDataChannels.MY_COMPANIES_CID);
        if (item == null) {
            item = <ComboboxInputData>{componentIdentifier: ComboboxComponent.IDENTIFIER, options: []};
            this.setMyCompaniesCID(item);
        }
        return item;
    }

    private setMyCompaniesCID(myCompanies: ComboboxInputData) {
        SESSION_STORE.setItem(BalcoDataChannels.MY_COMPANIES_CID, myCompanies);
    }


    public getUserString() {
        let user = this.getUser();
        return user != null ? user.gender.concat(' ').concat(user.vorname).concat(' ').concat(BALCO_DATA_STORE.getUser().name) : '';
    }

    public getBalanceOverview(typ: string): BalanceOverview | null {
        switch (typ) {
            case 'D':
                return <BalanceOverview>SESSION_STORE.getItem(BalcoDataChannels.BALANCE_OVERVIEW_D);
            case 'K':
                return <BalanceOverview>SESSION_STORE.getItem(BalcoDataChannels.BALANCE_OVERVIEW_K);
        }
        return null;
    }

    saveBalanceOverviewK(balanceOverviewK: BalanceOverview) {
        SESSION_STORE.setItem(BalcoDataChannels.BALANCE_OVERVIEW_K, balanceOverviewK);
    }

    saveBalanceOverviewD(balanceOverviewD: BalanceOverview) {
        SESSION_STORE.setItem(BalcoDataChannels.BALANCE_OVERVIEW_D, balanceOverviewD);
    }

    getLastFileUpload() {
        let item: FileUpload | null = LOCAL_STORE.getItem(BalcoDataChannels.IMPORT_LAST_UPLOAD + this.getSelectedIdl());
        if (item == null) {
            item = <FileUpload>{response: {}, files: []};
            LOCAL_STORE.setItem(BalcoDataChannels.IMPORT_LAST_UPLOAD + this.getSelectedIdl(), item);
        }
        return item;
    }

    setLastFileUpload(fileUpload: FileUpload) {
        let lastFileUpload: FileUpload = this.getLastFileUpload();
        if (lastFileUpload != null) {
            lastFileUpload.files.forEach(value => {
                fileUpload.files.push(value);
            });
        }
        LOCAL_STORE.setItem(BalcoDataChannels.IMPORT_LAST_UPLOAD + this.getSelectedIdl(), fileUpload);
    }

    async loadBalanceData() {
        let responseBalanceOverviewK = await HTTP_CLIENT.get('/BALANCE_OVERVIEW/' + BALCO_DATA_STORE.getSelectedCompany().idl + '/K');
        let responseBalanceOverviewBodyK = await responseBalanceOverviewK.text();
        let balanceOverviewK: BalanceOverview = JSON.parse(responseBalanceOverviewBodyK);
        BALCO_DATA_STORE.saveBalanceOverviewK(balanceOverviewK);

        let responseBalanceOverviewD = await HTTP_CLIENT.get('/BALANCE_OVERVIEW/' + BALCO_DATA_STORE.getSelectedCompany().idl + '/D');
        let responseBalanceOverviewBodyD = await responseBalanceOverviewD.text();
        let balanceOverviewD: BalanceOverview = JSON.parse(responseBalanceOverviewBodyD);
        BALCO_DATA_STORE.saveBalanceOverviewD(balanceOverviewD);
    }

    private getSelectedIdl(): string {
        return this.getSelectedCompany().idl;
    }
}

export const BALCO_DATA_STORE = new BalcoDataStore();
